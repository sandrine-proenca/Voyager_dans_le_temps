import { PartialType } from '@nestjs/swagger';
import { CreatePhotographyDto } from './create-photography.dto';

export class UpdatePhotographyDto extends PartialType(CreatePhotographyDto) {}
