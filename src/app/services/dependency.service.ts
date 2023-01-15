import { Injectable } from '@angular/core';
import { SimpleService as SimpleService } from './simple.service';

@Injectable({
  providedIn: 'root',
})
export class DependencyService {
  constructor(private simpleService: SimpleService) {}

  getValue(): string {
    return this.simpleService.getValue();
  }
}
