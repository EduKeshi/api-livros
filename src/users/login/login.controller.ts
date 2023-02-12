import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { Public } from 'src/auth/public-decorator';


@Controller('login')
export class LoginController {
    constructor(private authService: AuthService) {}

    @Public()
    @Post()
    getProfile(@Body() req) {
        console.log("Cheguei:", req)
        return this.authService.login(req.username, req.password)
    }
}
