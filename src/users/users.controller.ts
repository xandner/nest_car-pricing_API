import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
    constructor(private users: UsersService) { }
    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        return await this.users.create(body.email, body.password)
    }

    @Get('/users/:id')
    async getUser(@Param('id') id: number) {
        const user = await this.users.findOne(id)
        console.log(user)
        if (!user || user === null || user === undefined) {
            console.log("notfound")
            throw new NotFoundException('user not found');
        }
    }

    @Put("/users/:id")
    async updateUser(@Param("id") id:number,@Body() body:UpdateUserDto){
        return await this.users.update(id,body)
    }

    @Delete("/users/:id")
    async deleteUser(@Body("id") id:number){
        return await this.users.remove(id)
    }
}
