import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser=createParamDecorator(
    (data:never/* input of decorator */,context:ExecutionContext)=>{
        const request=context.switchToHttp().getRequest()
        return request.currentUser
    }
)