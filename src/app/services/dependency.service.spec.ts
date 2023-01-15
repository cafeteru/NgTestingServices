import { DependencyService } from './dependency.service';
import { SimpleService } from './simple.service';

describe('DependencyService', () => {
  let dependencyService: DependencyService;

  it('test with a mock object', () => {
    const mock = { getValue: () => 'mock value' } as SimpleService;
    dependencyService = new DependencyService(mock);
    expect(dependencyService.getValue()).toBe('mock value');
  });

  it('test with a spy', () => {
    const value = 'spy value';
    const spyService = jasmine.createSpyObj<SimpleService>(['getValue']); // createSpyObj() creates a mock object with the specified methods.
    spyService.getValue.and.returnValue(value);
    dependencyService = new DependencyService(spyService);
    const result = dependencyService.getValue();
    expect(result).toBe(value);
    expect(spyService.getValue).toHaveBeenCalled();
    expect(spyService.getValue).toHaveBeenCalledTimes(1);
  });
});
