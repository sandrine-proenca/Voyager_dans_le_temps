import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';
import { User } from 'src/users/entities/user.entity';
import { Album } from 'src/albums/entities/album.entity';

export class UpdatePhotoDto extends PartialType(CreatePhotoDto) {
    @ApiProperty()
    @IsString()
    photo: string;

    @ApiProperty()
    @IsString()
    information: string

    @ApiProperty()
    @IsOptional()
    mimeType: string;

    @ApiProperty()
    @IsOptional()
    user: User

    @ApiProperty()
    @IsOptional()
    album: Album
}
