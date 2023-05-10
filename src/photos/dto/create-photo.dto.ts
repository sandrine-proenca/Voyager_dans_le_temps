import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty,  IsOptional,  IsString } from "class-validator";

export class CreatePhotoDto {

    /* @ApiProperty()
    @IsNotEmpty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    information: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    mimeType: string; */

    @ApiProperty()
    @IsNotEmpty()
    albumId: string;

    /* @ApiProperty()
    @IsOptional()
    @IsInt()
    userId: number; */
}
