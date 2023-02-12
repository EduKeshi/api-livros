import { Module } from '@nestjs/common';
import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service/books.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { LoginController } from './users/login/login.controller';
import { UserController } from './users/user/user.controller';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Module({
  imports: [AuthModule, UsersModule],
  controllers: [BooksController, LoginController, UserController],
  providers: [BooksService, {provide: APP_GUARD, useClass: JwtAuthGuard}],
})
export class AppModule {}
