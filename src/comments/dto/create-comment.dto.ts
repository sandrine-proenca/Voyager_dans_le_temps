import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Length } from "class-validator";

export class CreateCommentDto
{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1,7000)
    content: string;

    /* @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    photo: Photo */

    @ApiProperty()
    @IsOptional()
    @IsInt()
    photoId: number;

}
