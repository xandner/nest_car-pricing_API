import { Injectable, NotFoundException, Param } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private repo: Repository<User>) { }
    async create(email: string, password: string) {
        const user = this.repo.create({
            email,
            password
        })
        return await this.repo.save(user)
    }

    async findOne(id: number) {
        try {
            const user = await this.repo.findOne({
                where: {
                    id: id
                }
            })
            return user
        } catch (error) {

        }
    }
    async update(id: number, attr: Partial<User>) {
        const user = await this.findOne(id)
        if (!user) throw new NotFoundException("user not exists")
        Object.assign(attr)
        return await this.repo.save(user)
    }

    async remove(id:number){
        const user=await this.findOne(id)
        if (!user) return  new NotFoundException("user not fount");
        return await this.repo.remove(user)
    }
}
