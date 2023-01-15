import { firstValueFrom } from 'rxjs';
import { SimpleService } from './simple.service';

describe('ServiceWithoutInyections', () => {
  let service: SimpleService;

  beforeEach(() => {
    service = new SimpleService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getValue', () => {
    it('should return real value', () => {
      expect(service.getValue()).toBe('real value');
    });
  });

  describe('setValue', () => {
    it('should set the value', () => {
      service.setValue('test value');
      expect(service.getValue()).toBe('test value');
    });
  });

  describe('getPromiseValue', () => {
    it('should return promise value with then', (done: DoneFn) => {
      service.getPromiseValue().then((value) => {
        expect(value).toBe('promise value');
        done(); // done() is required to tell Jasmine that the test is complete.
      });
    });

    it('should return promise value with async', async () => {
      const value = await service.getPromiseValue(); // await waits for the promise to resolve.
      expect(value).toBe('promise value');
    });
  });

  describe('getObservableValue', () => {
    it('should return observable value with subscribe', (done: DoneFn) => {
      service.getObservableValue().subscribe((value) => {
        expect(value).toBe('observable value');
        done(); // done() is required to tell Jasmine that the test is complete.
      });
    });

    it('should return observable value with async', async () => {
      const value = await firstValueFrom(service.getObservableValue());
      expect(value).toBe('observable value');
    });
  });
});
