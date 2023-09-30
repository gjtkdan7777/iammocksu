import { Controller, Get, Logger, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { User } from 'src/user/interfaces/user.interfaces';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
        // Passport 로그인 후에 실행될 메서드

        Logger.log('login', req.body)
        return this.authService.login(req.body);
    }

    
}