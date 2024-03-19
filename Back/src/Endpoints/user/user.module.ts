import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.schema';
import { JwtModule } from '@nestjs/jwt';
import { verificationSchema } from './Verification.Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'Verification', schema: verificationSchema },
    ]),
    JwtModule.register({
      secret: 'project',
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
