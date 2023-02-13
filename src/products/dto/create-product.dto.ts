import { IsString } from 'class-validator';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  MinLength,
} from 'class-validator';

// la inf como estoy esperando del request para la inserción
export class CreateProductDto {
  @IsString()
  @MinLength(1)
  title: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price?: number;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  slug?: string;

  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsString({ each: true }) // cada uno de los elementos deben cumplir la condicion de string
  @IsArray()
  sizes: string[];

  @IsIn(['men', 'women', 'kid', 'unix'])
  gender: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags: string[];
}
