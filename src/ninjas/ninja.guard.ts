import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class NinjaGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] as string;
    if (!authHeader) {
      throw new UnauthorizedException('Missing Authorization Header');
    }
    const [, token] = authHeader.split(' ');
    if (!token) {
      throw new UnauthorizedException('Invalid token format');
    }
    try {
      // validation of token here
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token format');
    }
  }
}
