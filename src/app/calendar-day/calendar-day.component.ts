import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  OnInit,
  ChangeDetectionStrategy
} from "@angular/core";
import * as getDaysInMonth from "date-fns/getDaysInMonth";
import * as getDay from "date-fns/getDay";

interface DateElement {
  label: number;
  date: Date;
}

@Component({
  selector: "app-calendar-day",
  templateUrl: "./calendar-day.component.html",
  styleUrls: ["./calendar-day.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarDayComponent implements OnChanges, OnInit {
  @Input()
  month: number;
  @Input()
  year: number;
  @Input()
  startDate: Date = new Date("9999-99-99");
  @Input()
  endDate: Date = new Date("1970-01-01");
  @Input()
  hoverDate: string = null;

  @Output()
  dateSelected: EventEmitter<Date> = new EventEmitter();
  @Output()
  dateHover: EventEmitter<string> = new EventEmitter();

  private _month: string;
  private mouseleaveTimeout: any;
  private dateRegex: RegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
  public days: Array<DateElement>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (typeof changes.month !== "undefined" && !changes.month.firstChange) {
      this.days = this.generateDaysArray();
    }
    if (typeof changes.year !== "undefined" && !changes.month.firstChange) {
      this.days = this.generateDaysArray();
    }
  }

  ngOnInit() {
    this.days = this.generateDaysArray();
  }

  private generateDaysArray() {
    const selectedDate = new Date(this.year, this.month);
    const daysInMonth = getDaysInMonth(selectedDate);
    const dayinWeek = getDay(selectedDate);
    const fillStart = Array(dayinWeek).fill({ label: null, date: null });
    const fillEndAmount = 7 - ((daysInMonth + dayinWeek) % 7);
    const fillEndAmountCorrected = fillEndAmount !== 7 ? fillEndAmount : 0;
    const fillEnd = Array(fillEndAmountCorrected).fill({
      label: null,
      date: null
    });
    const daysArr = Array();
    for (let i = 1; i <= daysInMonth; i++) {
      let daysObj: DateElement = {
        label: i,
        date: new Date(this.year, this.month, i)
      };
      daysArr.push(daysObj);
    }
    return [...fillStart, ...daysArr, ...fillEnd];
  }

  private getTwoDigitDay(day: number) {
    return day.toString().length === 1 ? "0" + day : day;
  }

  public selectDate(day: DateElement) {
    if (day) {
      this.dateSelected.emit(day.date);
    }
  }

  public onMouseOver($event, day: DateElement) {
    let hoverDate = null;
    if (day !== null) {
      hoverDate = day.date;
    }
    this.dateHover.emit(hoverDate);
    clearTimeout(this.mouseleaveTimeout);
  }

  public onMouseLeave($event, day: number) {
    this.mouseleaveTimeout = setTimeout(() => {
      this.dateHover.emit(null);
    }, 20);
  }
}
