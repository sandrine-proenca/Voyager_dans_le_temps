import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';
import { User } from 'src/users/entities/user.entity';
import { Photo } from 'src/photos/entities/photo.entity';

export class UpdateCommentDto extends PartialType(CreateCommentDto)
{

    @ApiProperty()
    @IsString()
    commentary: string;

    @IsOptional()
    user: User

    @IsOptional()
    photo: Photo
}
