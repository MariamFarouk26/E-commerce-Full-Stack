import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import emailjs from '@emailjs/nodejs';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('comments') private commentsModel) {}

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

  async create(createCommentDto: CreateCommentDto) {
    let templateParams = {
      from_name: 'Cara',
      message: `
      Thank you for sharing your concerns. We're here to address them and improve your experience. Let's connect and find a solution together.`,
      to_name: createCommentDto.user.name,
      email: createCommentDto.user.email,
    };
    let newComment = new this.commentsModel(createCommentDto);
    let allComments = await this.commentsModel.find({});
    let lastComment = allComments[allComments.length - 1]?.id || 0;
    newComment.id = lastComment + 1;
    await newComment.save();
    await this.sendEmail(templateParams);
    return { message: 'Email sent & added successfully', data: newComment };
  }
  findAll() {
    return this.commentsModel.find({});
  }

  findOne(id: number) {
    return this.commentsModel.findOne({ id: id });
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    let updatedComment = await this.commentsModel.updateOne(
      { id: id },
      { $set: updateCommentDto },
    );
    return {
      Message: 'Updated',
      updatedComment: updatedComment,
      Comment: await this.commentsModel.find({ id: id }),
    };
  }

  async remove(id: number) {
    let remainderproduct = await this.commentsModel.findOneAndDelete({
      id: id,
    });
    return { message: 'deleted Successfully', data: remainderproduct };
  }
}
