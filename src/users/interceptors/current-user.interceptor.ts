import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { UsersService } from "../users.service";
@Injectable()
export class CurrentUserIntercepto implements NestInterceptor{
    constructor (private userService:UsersService){}
    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request=context.switchToHttp().getRequest()
        const {userId}=request.session;
        if(userId){
            const user=await this.userService.findOne(userId)
            request.currentUser=user;
        }
        return next.handle()
    }
}