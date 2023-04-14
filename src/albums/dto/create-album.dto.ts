import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";

export class CreateAlbumDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsOptional()
    user: User

}
