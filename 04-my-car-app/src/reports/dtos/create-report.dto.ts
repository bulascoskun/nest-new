import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  make: string;

  @IsString()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(2050)
  year: number;

  @Min(0)
  @Max(10000000)
  @IsNumber()
  mileage: number;

  @IsLongitude()
  @IsNumber()
  lng: number;

  @IsLatitude()
  @IsNumber()
  lat: number;

  @Min(0)
  @Max(10000000)
  @IsNumber()
  price: number;
}
