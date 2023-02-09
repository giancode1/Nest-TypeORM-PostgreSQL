import { Type } from 'class-transformer';
import { IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  // Transformar
  @Type(() => Number) // enableImplicitConversions: true
  limit?: number;

  @IsOptional()
  // @IsPositive() // no lo esta considerando como positivo, sale error
  @Min(0)
  @Type(() => Number) // enableImplicitConversions: true
  offset?: number;
}
