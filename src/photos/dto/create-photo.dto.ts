import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty,  IsOptional,  IsString } from "class-validator";
import { Album } from "src/albums/entities/album.entity";
import { User } from "src/users/entities/user.entity";

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

    @ApiProperty()
    @IsOptional()
    user: User

    @ApiProperty()
    @IsOptional()
    album: Album
}
