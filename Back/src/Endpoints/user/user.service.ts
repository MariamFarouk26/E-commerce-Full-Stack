/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LoginDto } from './dto/log.dto';
import { regDto } from './dto/reg.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import emailjs from '@emailjs/nodejs';
import { verifycationCode } from './dto/verifycationCode.dto';
import { log } from 'console';
import { Readable } from 'stream';
import * as fs from 'fs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('user') private userModel,
    @InjectModel('Verification') private varifModel,
    private jwtService: JwtService,
  ) {}

  private async found(email: string) {
    return await this.userModel.findOne({ email: email });
  }

  async sendEmail(templateParams: any): Promise<any> {
    try {
      emailjs
        .send('service_b0xm5gf', 'template_qtaro0e', templateParams, {
          publicKey: 'UlECVUELiPKwmAoKz',
          privateKey: 'Bjde393re_NC-GJWyd1vg',
        })
        .then(
          (response) => {
            console.log('SUCCESS!', response.status, response.text);
          },
          (err) => {
            console.log('FAILED...', err);
          },
        );
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  async log(loguser: LoginDto, res: Response) {
    let founduser = await this.found(loguser.email);
    if (!founduser) return { message: 'Invalid Email Or Password !!' };

    if (founduser.flag) {
      if (founduser.isSeller && !founduser.admit) {
        let istruepass = await bcrypt.compare(
          loguser.password,
          founduser.password,
        );
        if (!istruepass) return { message: 'Invalid Email Or Password !!' };

        return {
          message:
            "Your application is still in review and once it's verfied you will be noticed over email",
        };
      }
      let istruepass = await bcrypt.compare(
        loguser.password,
        founduser.password,
      );
      if (!istruepass) return { message: 'Invalid Email Or Password !!' };
      let myJWT = await this.jwtService.sign({
        user: founduser,
      });
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      res.cookie('x-auth-token', myJWT, { expires: expirationDate });
      return { message: 'Logged-In Successfully' };
    } else {
      let istruepass = await bcrypt.compare(
        loguser.password,
        founduser.password,
      );
      if (!istruepass) return { message: 'Invalid Email Or Password !!' };
      return { message: 'Please verify your account' };
    }
  }

  async reg(reguser: regDto) {
    const confirmationCode = Math.floor(10000 + Math.random() * 90000);

    const templateParams = {
      from_name: 'Cara',
      message: `Your confirmation code is: ${confirmationCode}`,
      to_name: reguser.name,
      email: reguser.email,
    };
    let foundUser = await this.userModel.findOne({
      email: reguser.email,
    });
    let allUsers = await this.userModel.find({});
    if (foundUser)
      return {
        message:
          'Your email is already exist please enter another email or go to login ',
      };
    let lastuserID = allUsers[allUsers.length - 1]?.userID || 0;

    let salt = await bcrypt.genSalt(10);
    let HashedPassword = await bcrypt.hash(reguser.password, salt);
    reguser.password = HashedPassword;
    reguser.flag = false;
    reguser.userID = lastuserID + 1;
    let newUser = new this.userModel(reguser);
    await newUser.save();
    let Newvarif = new this.varifModel({
      userID: reguser.userID,
      email: reguser.email,
      code: confirmationCode,
    });
    await this.varifModel.deleteMany({ email: reguser.email });
    await Newvarif.save();

    const result = await this.sendEmail(templateParams);
    return {
      message: 'Created successfully please verifiy your account',
      data: newUser,
    };
  }
  async verify(code: verifycationCode, res: Response) {
    let foundUser = await this.varifModel.findOne({ email: code.email });
    let foundUserJWT = await this.userModel.findOne({ email: code.email });

    if (foundUser) {
      if (foundUser.code == code.code) {
        let updateUser = await this.userModel.updateOne(
          { email: code.email },
          {
            $set: { flag: true },
          },
        );
        await this.varifModel.deleteMany({ email: code.email });
        let myJWT = await this.jwtService.sign({
          user: foundUserJWT,
        });
        const expirationDate = new Date();
        expirationDate.setMonth(expirationDate.getMonth() + 1);
        res.cookie('x-auth-token', myJWT, { expires: expirationDate });
        return { message: 'Account Verified', user: updateUser };
      } else {
        return { message: 'Please insert the right code' };
      }
    } else {
      return { message: 'please insert the right email' };
    }
  }
  async forgetPassEmail(Email: { email: string }) {
    let foundUser = await this.userModel.findOne({
      email: Email.email,
    });
    const confirmationCode = Math.floor(10000 + Math.random() * 90000);
    await this.varifModel.deleteMany({ email: Email.email });

    if (foundUser) {
      const templateParams = {
        from_name: 'Cara',
        message: `Your confirmation code is: ${confirmationCode}`,
        to_name: foundUser.name,
        email: foundUser.email,
      };
      let Newvarif = new this.varifModel({
        userID: foundUser.userID,
        email: foundUser.email,
        code: confirmationCode,
      });
      await Newvarif.save();
      await this.sendEmail(templateParams);
      return { message: 'Email Sent' };
    } else {
      return { message: 'Wrong Email' };
    }
  }
  async codeForForget(code: verifycationCode) {
    let foundUser = await this.varifModel.findOne({ email: code.email });
    if (foundUser) {
      if (foundUser.code == code.code) {
        await this.varifModel.deleteOne({ email: code.email });

        return { message: 'Correct Code' };
      } else {
        return { message: 'Wrong Code' };
      }
    } else {
      return { message: 'Wrong Email' };
    }
  }
  async updatePass(
    EmailAndpassword: { email: string; password: string },
    res: Response,
  ) {
    let foundUser = await this.userModel.findOne({
      email: EmailAndpassword.email,
    });

    if (foundUser) {
      let salt = await bcrypt.genSalt(10);
      let HashedPassword = await bcrypt.hash(EmailAndpassword.password, salt);
      EmailAndpassword.password = HashedPassword;
      let updateUser = await this.userModel.updateOne(
        { email: foundUser.email },
        {
          $set: { password: EmailAndpassword.password },
        },
      );
      let myJWT = await this.jwtService.sign({
        user: foundUser,
      });
      const expirationDate = new Date();
      expirationDate.setMonth(expirationDate.getMonth() + 1);
      res.cookie('x-auth-token', myJWT, { expires: expirationDate });
      return { message: 'Password Updated ', user: updateUser };
    } else {
      return { message: 'Email is wrong' };
    }
  }
  async admitSeller(Email: { email: string }) {
    let findSeller = await this.userModel.updateOne(
      { email: Email.email },

      {
        $set: { admit: true },
      },
    );
    if (findSeller) {
      return { message: 'Seller request approved', updatedUser: findSeller };
    } else {
      return { message: 'Email wrong' };
    }
  }
  findAll() {
    return this.userModel.find({});
  }
  admited() {
    return this.userModel.find({
      isSeller: true,
      admit: true,
    });
  }
  notAdmited() {
    return this.userModel.find({
      isSeller: true,
      admit: false,
    });
  }
  findOne(id: number) {
    return this.userModel.find({ userID: id }, { _id: 0 });
  }

  async update(id: number, updateUserDto: any) {
    let updatedPro = await this.userModel.updateOne(
      { userID: id },
      { $set: updateUserDto },
    );
    return {
      Message: 'Updated',
      updatedUser: updatedPro,
      user: await this.userModel.find({ userID: id }),
    };
  }

  async remove(id: number) {
    let deleUser = await this.userModel.deleteOne({ userID: id });
    return { message: 'User Deleted', deleUser };
  }
  async uploadFile(file: Express.Multer.File, email: string) {
    const filePath = `public/${file.originalname}`;

    const readStream = Readable.from(file.buffer);

    const writeStream = fs.createWriteStream(filePath);

    readStream.pipe(writeStream);

    writeStream.on('error', (error) => {
      console.error('Error copying file:', error);
    });

    writeStream.on('finish', () => {
      console.log('File copied successfully.');
    });
    let newFilePath = filePath.split('/')[1];
    let updateUser = await this.userModel.updateOne(
      { email },
      {
        $set: { image: 'http://localhost:3001/' + newFilePath },
      },
    );

    return {
      filePath,
      updateUser,
      user: await this.userModel.findOne({ email }),
    };
  }
}
