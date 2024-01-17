import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Role } from 'src/resources/enums/role.enum';
import { NotAcceptableException } from '@nestjs/common/exceptions';

@ValidatorConstraint()
class IsRoleValidConstraint implements ValidatorConstraintInterface {
  validate(role: string): boolean {
    const roles = Object.values(Role);

    const validRole = roles.find((value) => value === role);

    if (validRole) {
      return true;
    }

    throw new NotAcceptableException(`${role} Não é um ENUM valido!`);
  }
}

export function IsRoleValid(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoleValidConstraint,
    });
  };
}
