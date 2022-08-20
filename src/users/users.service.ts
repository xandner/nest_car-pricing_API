import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor (@InjectRepository(User) private repo:Repository<User> ){}
    async create(email:string,password:string){
        const user=this.repo.create({
            email,
            password
        })
        return await this.repo.save(user)
    }

    async findOne(id:number){
        try {
            const user= await this.repo.findOne({
                where:{
                    id:id
                }
            })
            return user
        } catch (error) {
            
        }
    }
}
