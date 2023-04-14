import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
    

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty()
    @IsOptional()
    users: User[]

    @ApiProperty()
    @IsOptional()
    photos: Photo[]
}
