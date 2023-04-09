import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Album } from "src/albums/entities/album.entity";
import { User } from "src/users/entities/user.entity";

export class CreatePhotoDto {

    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    information: string

    @IsOptional()
    user: User

    @IsOptional()
    album: Album
}
