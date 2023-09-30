import { IsString, IsOptional, IsNumber, Min, IsEnum, IsArray, IsBoolean, ValidateNested, Max } from 'class-validator';
import { Type } from 'class-transformer';



export class StockDto {
  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsBoolean()
  inStock?: boolean;
}


export class ReviewDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  rating: number;

  @IsOptional()
  @IsString()
  text?: string;
}




export class CreateProductDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsEnum(['Electronics', 'Clothing', 'Books', 'Toys', 'Other'])
  category: string;

  @ValidateNested()
  @Type(() => StockDto)
  stock: StockDto;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => ReviewDto)
  reviews: ReviewDto[];
}


