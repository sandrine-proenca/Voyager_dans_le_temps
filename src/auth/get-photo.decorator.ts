import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import Photo from "src/photos/entities/photo.entity";

export const GetPhoto = createParamDecorator((_data, ctx:ExecutionContext): Photo =>
{
    const req = ctx.switchToHttp().getRequest();
    return req.photo;
})