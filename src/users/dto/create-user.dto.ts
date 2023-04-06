import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;
    
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstname: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsString()
    birthday: string;

    @ApiProperty()
    @IsString()
    phone: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    job: string;

    @ApiProperty()
    @IsString()
    father: string;

    @ApiProperty()
    @IsString()
    mother: string;

    @ApiProperty()
    @IsString()
    myself: string;

    @ApiProperty()
    @IsString()
    travel: string;

    @ApiProperty()
    @IsString()
    anecdote: string;

}

