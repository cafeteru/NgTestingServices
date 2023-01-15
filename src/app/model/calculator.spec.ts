import { Calculator } from './calculator';

describe('Tests for Calculator', () => {
  let calculator: Calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('#multiply should return 0 if any of the parameters is 0', () => {
    const result = calculator.multiply(2, 0);
    expect(result).toBe(0);
  });

  it('#multiply should return the product of two numbers', () => {
    const result = calculator.multiply(1, 4);
    expect(result).toEqual(4);
  });

  it('#divide should return null if the denominator is 0', () => {
    const result = calculator.divide(2, 0);
    expect(result).toBeNull();
  });

  it('#divide should return the quotient of two numbers', () => {
    const result = calculator.divide(4, 2);
    expect(result).toEqual(2);
  });

  it('#divide should return the quotient with decimals of two numbers', () => {
    const result = calculator.divide(5, 2);
    expect(result).toEqual(2.5);
  });
});
