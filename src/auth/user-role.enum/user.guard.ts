import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { User } from "src/users/entities/user.entity";
import { UserRoleEnum } from "./user-role.enum";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = [UserRoleEnum.USER, UserRoleEnum.FAMILY, UserRoleEnum.ADMIN];
        const user = context.switchToHttp().getRequest().user as User;
        return requiredRoles.includes(user.role);
    }
}