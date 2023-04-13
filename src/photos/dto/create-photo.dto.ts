import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsString } from "class-validator";

export class CreatePhotoDto {

    @ApiProperty()
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
    mimeType: string;

    /* @IsOptional()
    user: User */

    @ApiProperty()
    @IsNotEmpty()
    albumId: number;
}
