import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePhotoDto {

    @ApiProperty()
    @IsNotEmpty()
    albumId: string;

}
