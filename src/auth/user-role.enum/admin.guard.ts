import { Injectable } from "@nestjs/common/decorators";
import { CanActivate, ExecutionContext } from "@nestjs/common/interfaces";
import { Reflector } from "@nestjs/core";
import { User } from "src/users/entities/user.entity";
import { UserRoleEnum } from "./user-role.enum";


@Injectable()
export class AdminGuard implements CanActivate {
    constructor ( private readonly reflector: Reflector) {}

    canActivate ( context: ExecutionContext): boolean {

        const requiredRoles = [UserRoleEnum.ADMIN]
        const user = context.switchToHttp().getRequest().user as User

        return requiredRoles.includes(user.role)
    }
}