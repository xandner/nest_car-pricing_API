import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { handleRetry } from "@nestjs/typeorm";
import { plainToClass } from "class-transformer";
import { map, Observable } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        return next.handle().pipe(
            map((data:any)=>{
                return plainToClass(UserDto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}