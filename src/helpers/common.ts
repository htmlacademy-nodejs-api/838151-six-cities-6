import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { ApplicationError, ValidationErrorField } from '../libs/rest/index.js';

const CONSTANTS = {
  MIN_VALUE: 0,
  MIDDLE_VALUE: 0.5,
  OFFSET: 1
};

export function generateRandomValue(min: number, max: number, numAfterDigit = CONSTANTS.MIN_VALUE) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(CONSTANTS.MIN_VALUE, items.length - CONSTANTS.OFFSET);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(CONSTANTS.MIN_VALUE, items.length - CONSTANTS.OFFSET)];
}

export function getRandomBoolean(): boolean {
  return Math.random() < CONSTANTS.MIDDLE_VALUE;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });
}

export function createErrorObject(
  errorType: ApplicationError,
  error: string,
  details: ValidationErrorField[] = []
) {
  return { errorType, error, details };
}

export function reduceValidationErrors(
  errors: ValidationError[]
): ValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}

export function getFullServerPath(host: string, port: number) {
  return `http://${host}:${port}`;
}
