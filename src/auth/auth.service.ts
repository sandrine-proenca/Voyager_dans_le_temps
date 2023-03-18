import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {

    constructor ( private usersService: UsersService){}

    async validateUser( email: string, password: string ): Promise <any> {
        const user = await this.usersService.findUserByEmail(email)

        /* Compare Password hashe with that of the user */
        const encodePassword = await bcrypt.compare(password, user.password)
        if( user && encodePassword){
        /* replace user.password with hash const name */
        const { password, ...result } = user
        return result
        }
        return null
    }


    async login (user: any) {

        const targetUser = await this.usersService.findUserByEmail(user.email)
        const payload = { email: targetUser.email, sub: targetUser.id}

        return {
            user: targetUser,
            access_token: this.jwtService.sign(payload)
        }
    }
}
