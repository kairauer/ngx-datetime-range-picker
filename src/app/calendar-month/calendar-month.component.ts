import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";

@Component({
  selector: "app-calendar-month",
  templateUrl: "./calendar-month.component.html",
  styleUrls: ["./calendar-month.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarMonthComponent {
  @Input()
  monthNames: Array<string>;
  @Output()
  monthSelected: EventEmitter<string> = new EventEmitter();

  constructor() {}

  public selectMonth(monthIndex: number) {
    const monthString =
      monthIndex.toString().length === 1
        ? "0" + monthIndex
        : monthIndex.toString();
    this.monthSelected.emit(monthString);
  }
}
