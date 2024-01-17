import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class PasswordHashGenerator implements PipeTransform {
  async transform(password: string) {
    const passwordHash = await bcryptjs.hash(password, 12);

    return passwordHash;
  }
}
