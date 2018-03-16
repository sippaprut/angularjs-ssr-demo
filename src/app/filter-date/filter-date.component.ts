import { Component, OnInit, HostListener, ElementRef, ViewChild, EventEmitter, Output, Input, Renderer } from '@angular/core';
import { dateType , DateType } from './../datetype';
import { from } from 'rxjs/observable/from';
import { filter, delay  } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'app-filter-date',
  templateUrl: './filter-date.component.html',
  styleUrls: ['./filter-date.component.css']
})
export class FilterDateComponent implements OnInit {

  @ViewChild("inputSearch") $inputSearch: ElementRef;


  @Output() onSelected = new EventEmitter<DateType>();
  @Input() placeholder: string; 

  dateOptions = dateType;

  selectedDate: DateType;
  isShowDropdown: boolean;

  dateToOptions = {
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    minDate: ''
  };

  dateFromOptions = {
    singleDatePicker: true,
    showDropdowns: true,
    autoUpdateInput: false,
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    maxDate: ''
  };

  private _excludeClassCloseWindow = [];
  
  constructor( 
    private eleRef: ElementRef,
    private renderer: Renderer
  ) { 
  }

  ngOnInit() {
    this.isShowDropdown = false;
    this._clearSelected();
  }

  searchItem(search: any) : DateType[] {
    this._clearSelected();
    if (search === "") {
      this.dateOptions = dateType;
      return this.dateOptions;
    }
    return this.dateOptions = dateType.filter( options => {
      let regex = new RegExp( search , "gi");
      return options.name.match(regex);
    });
  }

  toggleDropdown($event: Event): void {
    $event.preventDefault();
    $event.stopPropagation();

    this.isShowDropdown = ! this.isShowDropdown;
    if ( this.isShowDropdown === true ) {
      setTimeout(() => {
        this.renderer.invokeElementMethod(this.$inputSearch.nativeElement, 'focus');
        this.renderer.setElementProperty(this.$inputSearch.nativeElement , 'value' , '');
      });
    } 
    // Observable.create( observer => {
    //   this.isShowDropdown = ! this.isShowDropdown;
    //   observer.next(this.isShowDropdown);
    // })
    // .pipe(
    //   delay(0)
    // )
    // .subscribe((status) => {
    //   if ( status === true ) {
    //     this.renderer.invokeElementMethod(this.$inputSearch.nativeElement, 'focus');
    //     this.renderer.setElementProperty(this.$inputSearch.nativeElement , 'value' , '');
    //   }
    // });

  }

  selectOption(option: DateType): void {
    this._clearSelected();

    from(dateType)
    .pipe(
      filter(v => v.name === option.name ),
      delay(0)
    )
    .subscribe((data) => {
      this.selectedDate = JSON.parse(JSON.stringify(data));
      if ( this.isCustomDate() === false ) {
          this.isShowDropdown = false;
      }
      this.onSelected.emit(this.selectedDate);
    });
    // let item = JSON.stringify(dateType.find( v => v.name === option.name ));
    // this.selectedDate = JSON.parse(item);
    // if ( this.isCustomDate() === false ) {
    //   this.isShowDropdown = false;
    // }
    // this.onSelected.emit(this.selectedDate);
  }

  isCustomDate(): boolean {
    if ( this.selectedDate.hasDateFrom === true || this.selectedDate.hasDateTo === true ) {
      return true;
    }
    return false;
  }

  afterSelectedFromCustomDate(value: any): void {
    this.selectedDate.start = value;
    this.selectedDate.label = `${this.selectedDate.name}: ${this.selectedDate.start}`;
    if ( this.selectedDate.hasDateTo === false ) {
      this.isShowDropdown = false;
    } else {
      this.dateToOptions.minDate = this.selectedDate.start;
      if ( this.isSelectedDateEnd() ) {
        this.selectedDate.label = `${this.selectedDate.name}: ${this.selectedDate.start} - ${this.selectedDate.end}`
        this.isShowDropdown = false;
      }
    }
  }

  afterSelectedToCustomDate(value: any): void {
    this.selectedDate.end = value;
    this.dateFromOptions.maxDate = this.selectedDate.end;
    if ( this.isSelectedDateStart() ) {
      this.selectedDate.label = `${this.selectedDate.name}: ${this.selectedDate.start} - ${this.selectedDate.end}`;
      this.isShowDropdown = false;
    } else {
      this.selectedDate.label = `${this.selectedDate.name}: ${this.selectedDate.end}`;
    }
  }

  showLabelOption(): any {
    return typeof this.selectedDate.label !== 'undefined'  ? this.selectedDate.label : this.selectedDate.name;
  }

  isSelectedDateStart(): boolean {
    return typeof this.selectedDate.start !== 'undefined' && this.selectedDate.start !== "";
  }

  isSelectedDateEnd(): boolean {
    return typeof this.selectedDate.end !== 'undefined' && this.selectedDate.end !== "";
  }

  @HostListener('document:click', ['$event']) closeOutsideDropdown($event: any): void {
    let exclude = this._excludeClassCloseWindow.filter( (value) => $event.target.classList.contains(value) );
    if ( this.eleRef.nativeElement.contains($event.target) === false && exclude.length === 0 ) {
      this.isShowDropdown = false;
    }   
  }

  private _clearSelected(): any {
    this.selectedDate = {
      name: '',
      label: '',
      hasDateFrom: false,
      hasDateTo: false,
      start: '' ,
      end: ''
    };
    this.dateFromOptions.maxDate = '';
    this.dateToOptions.minDate = '';
  }


}
