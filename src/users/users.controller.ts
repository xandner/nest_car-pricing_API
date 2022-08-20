import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
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
            throw new NotFoundException('message not found');
        }
    }
}
