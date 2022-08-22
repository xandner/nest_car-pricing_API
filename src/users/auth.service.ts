import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";
import { UsersService } from "./users.service";

const scrypt = promisify(_scrypt);
@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }
    async sinup(email: string, password: string) {
        const user = await this.userService.findByEmail(email)
        // console.log(user)
        if (user && user.id) {
            throw new BadRequestException("email already in use")
        }
        const salt = randomBytes(8).toString('hex');
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        const result = salt + "." + hash.toString("hex");
        const createdUser = await this.userService.create(email, result);
        return createdUser
    }

    async sinin(email: string, password: string) {
        const user = await this.userService.findByEmail(email);
        console.log('user->', user)
        if (!user || !user.id) {
            throw new NotFoundException("email not valid")
        }
        const [salt, storedHash] = user.password.split(".");
        const hash = (await scrypt(password, salt, 32)) as Buffer;
        if (storedHash === hash.toString("hex")) return user;
        else throw new BadRequestException("password not valid")
    }
}