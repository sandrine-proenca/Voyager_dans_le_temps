import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/albums/entities/album.entity';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto)
{
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
