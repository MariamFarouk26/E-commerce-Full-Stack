import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginDto } from './dto/log.dto';
import { regDto } from './dto/reg.dto';
import { Response } from 'express';
import { verifycationCode } from './dto/verifycationCode.dto';
import { UserRoles } from './roles.decoretor';
import { Role } from './roles.enum';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UsePipes(ValidationPipe)
  @Post('log')
  log(@Body() loguser: LoginDto, @Res({ passthrough: true }) res: Response) {
    return this.userService.log(loguser, res);
  }
  @UsePipes(ValidationPipe)
  @Post('/reg')
  reg(@Body() reguser: regDto) {
    return this.userService.reg(reguser);
  }
  @Post('upload')
  @UseInterceptors(FileInterceptor('imageID')) // 'imageID' is the field name used in the form
  async uploadFile(
    @UploadedFile() imageID: Express.Multer.File,
    @Body('email') email: string,
  ) {
    return this.userService.uploadFile(imageID, email);
  }
  @UsePipes(ValidationPipe)
  @Post('/verify')
  verify(
    @Body() verifycationCode: verifycationCode,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.verify(verifycationCode, res);
  }
  @UsePipes(ValidationPipe)
  @Post('/forgetPassEmail')
  forgetPassEmail(@Body() Email: { email: string }) {
    return this.userService.forgetPassEmail(Email);
  }
  @UsePipes(ValidationPipe)
  @Post('/admitSeller')
  admitSeller(@Body() Email: { email: string }) {
    return this.userService.admitSeller(Email);
  }
  @UsePipes(ValidationPipe)
  @Post('/codeForForget')
  codeForForget(@Body() code: verifycationCode) {
    return this.userService.codeForForget(code);
  }
  @UsePipes(ValidationPipe)
  @Post('/updatePass')
  updatePass(
    @Body() EmailAndpassword: { email: string; password: string },
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.userService.updatePass(EmailAndpassword, res);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @Get('admited')
  admited() {
    return this.userService.admited();
  }
  @Get('notAdmited')
  notAdmited() {
    return this.userService.notAdmited();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UsePipes(ValidationPipe)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }
  @UserRoles(Role.Admin, Role.Seller)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
