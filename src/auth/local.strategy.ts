import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { User } from 'src/users/entities/user.entity';
import { AuthService } from './auth.service';


@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService)
    {
        super({
            usernameField: 'email',
            passwordField: 'password'
        })
    }

    async validate(email: string, password: string): Promise<any>
    {

        /* The constant verifies that the password is correct */
        const correctEmail = await User.findOneBy({ email })

        /* Condition that returns an error message if the email is incorrect */
        if ( correctEmail === null ){
            throw new HttpException ( `Email is incorrect`, HttpStatus.NOT_ACCEPTABLE )
        }

        const user = await this.authService.validateUser(email, password)

        /* Condition that returns an error if the user is not authorized */
        if (!user)
        {
            throw new UnauthorizedException()
        }
        /* Otherwise returns the user */
        return user
    }
}
