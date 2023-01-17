import { TestBed } from '@angular/core/testing';
import { DependencyService } from './dependency.service';
import { SimpleService } from './simple.service';

describe('DependencyService', () => {
  let dependencyService: DependencyService;
  let spyService: jasmine.SpyObj<SimpleService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('SimpleService', ['getValue']);
    TestBed.configureTestingModule({
      providers: [DependencyService, { provide: SimpleService, useValue: spy }],
    });
    dependencyService = TestBed.inject(DependencyService);
    spyService = TestBed.inject(SimpleService) as jasmine.SpyObj<SimpleService>;
  });

  it('should be created', () => {
    expect(dependencyService).toBeTruthy();
  });

  it('test with a mock object', () => {
    const mock = { getValue: () => 'mock value' } as SimpleService;
    dependencyService = new DependencyService(mock);
    expect(dependencyService.getValue()).toBe('mock value');
  });

  it('test with a spy', () => {
    const value = 'spy value';
    spyService.getValue.and.returnValue(value);
    const result = dependencyService.getValue();
    expect(result).toBe(value);
    expect(spyService.getValue).toHaveBeenCalled();
    expect(spyService.getValue).toHaveBeenCalledTimes(1);
  });
});
