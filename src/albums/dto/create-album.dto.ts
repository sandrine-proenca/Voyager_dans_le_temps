import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    familyName: string

    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    information: string
}
