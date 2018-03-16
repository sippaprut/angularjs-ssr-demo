import { Component, OnInit , EventEmitter , Output } from '@angular/core';
import { States, statesData } from './../states';

@Component({
  selector: 'app-state-options',
  templateUrl: './state-options.component.html',
  styleUrls: ['./state-options.component.css']
})
export class StateOptionsComponent implements OnInit {
  
  @Output() onSelected = new EventEmitter<any>();

  states = statesData;

  selectedState: any;

  constructor() { }

  ngOnInit() {
  }

  optionSelected() : void {
    this.onSelected.emit(this.selectedState);
  }

}
