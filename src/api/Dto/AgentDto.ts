import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class AgentDto {
  @ApiProperty()
  @IsNotEmpty()
  firstName: string;
  @ApiProperty()
  @IsNotEmpty()
  lastName: string;
  @ApiProperty()
  @IsNotEmpty()
  phone: string;
  @ApiProperty()
  @IsEmail()
  email: string;
  @ApiPropertyOptional()
  photoUrl: string | undefined;
}
