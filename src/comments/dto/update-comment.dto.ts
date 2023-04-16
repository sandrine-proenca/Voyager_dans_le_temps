import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsObject, IsOptional, IsString, Length } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { Photo } from 'src/photos/entities/photo.entity';
export class UpdateCommentDto extends PartialType(CreateCommentDto)
{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Length(1, 5000)
    content: string;
    
    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    photo: Photo

    /* @ApiProperty()
    @IsOptional()
    @IsInt()
    photoId: number; */

}
