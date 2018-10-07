import {
  Component,
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
  monthSelected: EventEmitter<number> = new EventEmitter();

  constructor() {}

  public selectMonth(monthIndex: number) {
    this.monthSelected.emit(monthIndex);
  }
}
