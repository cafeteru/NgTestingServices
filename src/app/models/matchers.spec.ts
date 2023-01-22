describe('Tests for matchers', () => {
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
