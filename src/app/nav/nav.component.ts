import { Component, OnInit } from '@angular/core';
import { dateType , DateType } from './../datetype';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isCollapsed : Boolean = false;

  selectedState: any;

  date: DateType;

  constructor() { }

  collapsed() : boolean {
    return this.isCollapsed = ! this.isCollapsed;
  }

  ngOnInit() {
  }

  selected(value: any) : void {
    this.selectedState = value;
  }

  selectedDate(value: DateType): void {
    this.date = value;
  }

}
