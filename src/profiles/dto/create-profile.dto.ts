import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class CreateProfilesDto {

    @ApiProperty()
    @IsString()
    @IsOptional()
    job: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    father: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    mother: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    myself: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    travel: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    anecdote: string

}
