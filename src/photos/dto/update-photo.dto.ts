import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { CreatePhotoDto } from './create-photo.dto';

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
    @IsInt()
    albumId: number;

    @ApiProperty()
    @IsOptional()
    @IsInt()
    userId: number;
}
