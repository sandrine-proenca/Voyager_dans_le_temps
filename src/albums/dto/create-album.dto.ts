import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateAlbumDto {
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string
}
