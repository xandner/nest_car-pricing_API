import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { serialize } from 'src/interceptors/serialize.iterceptor';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';

@Controller('auth')
@serialize(UserDto)
// @UseInterceptors(CurrentUserIntercepto)
export class UsersController {
    constructor(private users: UsersService, private authService: AuthService) { }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto,@Session() session:any) {
        const user= await this.authService.sinup(body.email, body.password)
        session.userId=user.id;
        return user
    }

    @Post("/signin")
    async sigin(@Body() body: CreateUserDto,@Session() session:any) {
        const user=await this.authService.sinin(body.email, body.password)
        session.userId=user.id;
        return user
    }

    @Get("who-im-i")
    @UseGuards(AuthGuard)
    async whoImI(@CurrentUser() user:User){
        return user
    }

    @Post("/signuot")
    signout(@Session() sessiion:any){
        sessiion.userId=null
    }


    @Get('/users/:id')
    async getUser(@Param('id') id: number) {
        const user = await this.users.findOne(id)
        if (!user || user === null || user === undefined) {
            console.log("notfound")
            throw new NotFoundException('user not found');
        }
        return user
    }

    @Put("/users/:id")
    async updateUser(@Param("id") id: number, @Body() body: UpdateUserDto) {
        return await this.users.update(id, body)
    }

    @Delete("/users/:id")
    async deleteUser(@Body("id") id: number) {
        return await this.users.remove(id)
    }
}
