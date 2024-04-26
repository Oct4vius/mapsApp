import { Component, Input } from '@angular/core';

@Component({
  selector: 'alone-counter',
  standalone: true,
  templateUrl: './counter.component.html',
})
export class CounterComponent {

  @Input()
  public counter = 10;



}
