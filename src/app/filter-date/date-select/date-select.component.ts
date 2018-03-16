import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { DaterangepickerConfig } from 'ng2-daterangepicker';
import * as moment from 'moment';

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit {

  @Input() date: any;

  @Input() placeholder: any;
  
  @Input() options: DaterangepickerConfig ;

  @Output() onSelected = new EventEmitter<any>();

  constructor() { }

  selected(value: any ) : void {
    this.date = this._convertDate(value.start); 
    this.onSelected.emit(this.date);
  }

  private _convertDate(date: Date): any {
    return moment(date).format('YYYY-MM-DD');
  }

 

  ngOnInit() {
    console.log('ngOnInit dAtepicker' , this.placeholder);
  }

}
