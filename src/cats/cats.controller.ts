import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatsService } from './cats.service';
import { CatRequestDto } from './dto/cats.request.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ReadOnlyCatDto } from './dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
  // 디펜던시 인젝션
  constructor(
    private readonly catsService: CatsService,
    private readonly authService: AuthService,
  ) {}

  // Swagger
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data)
  }

  @ApiOperation({ summary: '고양이 가져오기' })
  @Get()
  getCurrentCat() {
    return 'current Cat';
  }

  @ApiResponse({
    status: 200,
    description: '성공',
    type: ReadOnlyCatDto,
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    console.log(body);
    return await this.catsService.signUp(body);
  }
}
