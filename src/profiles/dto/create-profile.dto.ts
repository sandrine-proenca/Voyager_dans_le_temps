import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateProfilesDto {

    @ApiProperty()
    @IsString()
    job: string

    @ApiProperty()
    @IsString()
    father: string

    @ApiProperty()
    @IsString()
    mother: string

    @ApiProperty()
    @IsString()
    myself: string

    @ApiProperty()
    @IsString()
    travel: string

    @ApiProperty()
    @IsString()
    anecdote: string

}
