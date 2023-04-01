import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreatePhotoDto {

    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    information: string
}
