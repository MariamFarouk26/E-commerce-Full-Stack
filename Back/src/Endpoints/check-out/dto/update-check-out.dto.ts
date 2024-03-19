import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckOutDto } from './create-check-out.dto';

export class UpdateCheckOutDto extends PartialType(CreateCheckOutDto) {}
