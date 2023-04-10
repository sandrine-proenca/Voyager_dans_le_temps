import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
import { Photo } from "src/photos/entities/photo.entity";
import { User } from "src/users/entities/user.entity";

export class CreateCommentDto
{
    @ApiProperty()
    @IsString()
    commentary: string;

    @IsOptional()
    user: User

    @IsOptional()
    photo: Photo
}
