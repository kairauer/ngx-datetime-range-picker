import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-calendar",
  templateUrl: "./calendar.component.html",
  styleUrls: ["./calendar.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {
  @Input()
  view: string = "day";
  @Input()
  month: number;
  @Input()
  year: number;
  @Input()
  startDate: Date;
  @Input()
  endDate: Date;
  @Input()
  hoverDate: Date;
  @Input()
  monthNames: Array<string>;

  @Output()
  daySelected: EventEmitter<number> = new EventEmitter();
  @Output()
  dateHover: EventEmitter<Date> = new EventEmitter();
  @Output()
  monthSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public onSelectDate($event) {
    this.daySelected.emit($event);
  }

  public onDateHover($event) {
    this.dateHover.emit($event);
  }

  public onMonthSelected($event) {
    this.monthSelected.emit($event);
  }
}

/*
 * getDay(...) return values
 *
 * 0 = sonntag
 * 1 = montag
 * 2 = dienstag
 * 3 = mittwoch
 * 4 = donnerstag
 * 5 = freitag
 * 6 = samstag
 *
 * */
