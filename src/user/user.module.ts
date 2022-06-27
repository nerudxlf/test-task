import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {UserModel} from "./user.model";

@Module({
  controllers: [UserController],
  imports: [
    SequelizeModule.forFeature([UserModel]),
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
