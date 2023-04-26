import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor( private readonly userService: UsersService )
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken() /* The method by which the JWT will be extracted from the 'Request' */,
            ignoreExpiration: false,
            secretOrKey: process.env.SECRET,
        });
    }

    async validate ( payload: any ) {

        const user = await this.userService.findOne( payload.sub) /* role */

        /* Condition that does not authorize if it's not the user */
        if ( !user ){
            throw new UnauthorizedException ()
        }

        return {userId: payload.sub, email: payload.email}
    }
}