import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import {UserModule} from "../user/user.module";
import {JwtModule} from "@nestjs/jwt";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {getJWTConfig} from "../configs/jwt_config";

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
      JwtModule.registerAsync({
          imports: [ConfigModule],
          inject: [ConfigService],
          useFactory: getJWTConfig,
      }),
      UserModule,
  ]
})
export class AuthModule {}
