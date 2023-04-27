import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

export const GetUser = createParamDecorator((_data, ctx:ExecutionContext): User =>
{
    const req = ctx.switchToHttp().getRequest();
    console.log('GetUser: ',req.user);
    
    return req.user;
})