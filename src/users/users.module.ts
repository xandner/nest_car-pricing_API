import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { CurrentUserIntercepto } from './interceptors/current-user.interceptor';
import { UsersController } from './users.controller';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Module({
  imports:[TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    AuthService,
    CurrentUserIntercepto,
    //! global interceptors
    {
      provide:APP_INTERCEPTOR,
      useClass:CurrentUserIntercepto
    }
  ]
})
export class UsersModule {}
