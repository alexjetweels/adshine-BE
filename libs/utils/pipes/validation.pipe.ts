import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

const ISOStringRegex = new RegExp(
  '^\\d\\d\\d\\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01])T(00|0[0-9]|1[0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9].[0-9][0-9][0-9])Z$',
);

@ValidatorConstraint({ name: 'IsPassword', async: false })
export class CustomValidateIsPassword implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const IsPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[_@./!@#$%^*(),~`'":;\\\?}\<\>\]\{[&+-]).{6,}$/;

    return IsPassword.test(text);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} minimum of six characters, at least one uppercase letter, one lowercase letter, one number, and one special character`;
  }
}
