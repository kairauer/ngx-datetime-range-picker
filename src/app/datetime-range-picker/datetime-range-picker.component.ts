import {
  Component,
  OnInit,
  HostListener,
  ChangeDetectionStrategy
} from "@angular/core";
import * as dateFnsParse from "date-fns/parse";
import * as isValid from "date-fns/isValid";

@Component({
  selector: "app-datetime-range-picker",
  templateUrl: "./datetime-range-picker.component.html",
  styleUrls: ["./datetime-range-picker.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatetimeRangePickerComponent implements OnInit {
  public calendarOpen: boolean = true;
  public startDate: Date;
  public endDate: Date;
  public hoverDate: Date;
  public startYear: number = 2018;
  public startMonth: number = 7;
  public endYear: number = 2018;
  public endMonth: number = 8;
  public startValid: boolean;
  public endValid: boolean;
  public startView: string = "month";
  public endView: string = "day";
  public dateFormat: string = "dd.MM.yyyy";
  public dateRegex: RegExp = /[0-9]{2}.[0-9]{2}.[0-9]{4}/;
  public monthNames: Array<string> = [
    "Januar",
    "Februar",
    "März",
    "Apri",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember"
  ];
  // private dateRegex: RegExp = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;

  constructor() {}

  @HostListener("document:click", ["$event"])
  clickedOutside($event) {
    if (
      this.calendarOpen &&
      !$event.target.classList.contains("input-field") &&
      !$event.target.classList.contains("icon")
    ) {
      this.calendarOpen = false;
    }
  }

  ngOnInit() {}

  public focus(element: string) {
    this.calendarOpen = true;
  }

  public blur(element: string) {}

  public clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  public prevMonth() {
    if (this.startMonth - 1 < 1) {
      this.startMonth = 12;
      this.startYear--;
    } else {
      this.startMonth--;
    }
    if (this.endMonth - 1 < 1) {
      this.endMonth = 12;
      this.endYear--;
    } else {
      this.endMonth--;
    }
  }

  public nextMonth() {
    if (this.startMonth + 1 > 12) {
      this.startMonth = 1;
      this.startYear++;
    } else {
      this.startMonth++;
    }
    if (this.endMonth + 1 > 12) {
      this.endMonth = 1;
      this.endYear++;
    } else {
      this.endMonth++;
    }
  }

  public daySelected($event: Date) {
    const selectedDate = $event;
    if (!this.startDate && !this.endDate) {
      this.startDate = selectedDate;
    } else if (this.endDate && this.startDate < selectedDate) {
      this.startDate = selectedDate;
      this.endDate = null;
    } else if (this.endDate && this.startDate > selectedDate) {
      this.startDate = selectedDate;
    } else if (
      this.startDate &&
      !this.endDate &&
      this.startDate < selectedDate
    ) {
      this.endDate = selectedDate;
    } else if (
      this.startDate &&
      !this.endDate &&
      this.startDate > selectedDate
    ) {
      this.endDate = this.startDate;
      this.startDate = selectedDate;
    } else if (!this.startDate && this.endDate) {
      this.startDate = selectedDate;
    }
    // console.log(`Start: ${this.startDate} ### End: ${this.endDate}`);
  }

  public startChanged($event) {
    if ($event > this.endDate) {
      this.endDate = null;
    }
    if (!this.dateRegex.test($event)) {
      this.startValid = false;
    } else {
      const parsedDate = dateFnsParse($event, this.dateFormat, new Date());
      if (isValid(parsedDate)) {
        this.startDate = parsedDate;
        this.startValid = true;
      }
    }
  }

  public endChanged($event) {
    if ($event < this.startDate) {
      this.startDate = null;
    }
    if (!this.dateRegex.test($event)) {
      this.endValid = false;
    } else {
      const parsedDate = dateFnsParse($event, this.dateFormat, new Date());
      if (isValid(parsedDate)) {
        this.endDate = parsedDate;
        this.endValid = true;
      }
    }
  }

  public dateHover($event) {
    this.hoverDate = $event;
  }

  public monthSelected($event: string, calendarIndex: number) {
    if (calendarIndex === 0) {
      this.startView = "day";
    } else {
      this.endView = "day";
    }
  }

  public monthClicked(calendarIndex: number) {
    if (calendarIndex === 0) {
      this.startView = "month";
    } else {
      this.endView = "month";
    }
  }
}