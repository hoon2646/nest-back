import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
import { CatsRepository } from 'src/cats/cats.repository';
import { CatsModule } from 'src/cats/cats.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    // 로그인 할 때 사용
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1y' },
    }),

    // Cats Export 들을 import 하여 사용
    forwardRef(() => CatsModule)
  ],
  // provider 캡슐화.
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
