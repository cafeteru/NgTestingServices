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

  it('toBeDefined and toBeUndefined matchers', () => {
    const name = 'John';
    let name2;

    expect(name).toBeDefined();
    expect(name2).toBeUndefined();
    expect(name2).not.toBeDefined();
  });

  it('toBeTruthy and toBeFalsy matchers', () => {
    expect(1 + 3 === 4).toBeTruthy();
    expect(1 + 1 === 3).toBeFalsy();
    expect(1 + 1 === 3).not.toBeTruthy();
  });

  it('toBeLessThan and toBeGreaterThan matchers', () => {
    expect(5).toBeLessThan(10);
    expect(20).toBeGreaterThan(10);
  });

  it('toMatch and toContain matchers', () => {
    expect('123456').toMatch(/123/);
    expect(['a', 'b', 'c']).toContain('a');
  });
});
