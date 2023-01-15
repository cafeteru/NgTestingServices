import { Component, OnInit } from '@angular/core';
import { Calculator } from './model/calculator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'ng-testing-services';

  ngOnInit(): void {
    const calculator = new Calculator();
    const result = calculator.multiply(2, 3);
    console.log(result);
    const result2 = calculator.divide(2, 0);
    console.log(result2 === null);
  }
}
