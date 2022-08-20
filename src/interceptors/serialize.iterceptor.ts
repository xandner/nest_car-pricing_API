import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export function serialize(dto:any){
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor{
    constructor (private dto:any){}
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        return next.handle().pipe(
            map((data:any)=>{
                return plainToInstance(this.dto,data,{
                    excludeExtraneousValues:true
                })
            })
        )
    }
}