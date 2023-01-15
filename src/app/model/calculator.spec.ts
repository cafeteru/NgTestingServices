import { Calculator } from "./calculator";

describe('Tests forCalculator', () => {
    it('#multiply should return 0 if any of the parameters is 0', () => {
        // Arrange
        const calculator = new Calculator();
       
        // Act
        const result = calculator.multiply(2, 0);
       
        // Assert
        expect(result).toBe(0);
    });
});