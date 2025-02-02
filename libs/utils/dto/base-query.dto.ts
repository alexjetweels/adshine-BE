import {
  DateFieldOptional,
  DefaultValue,
  NumberFieldOptional,
  StringFieldOptional,
} from 'libs/utils';

export class BaseQueryDto {
  @NumberFieldOptional({ min: 0 })
  @DefaultValue(1)
  page: number = 1;

  @NumberFieldOptional({ min: 0, maximum: 100 })
  @DefaultValue(20)
  limit: number = 20;

  @StringFieldOptional()
  search?: string;

  @DateFieldOptional()
  startTime?: Date;

  @DateFieldOptional()
  endTime?: Date;
}
