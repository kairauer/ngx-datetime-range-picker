import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { DatetimeRangePickerComponent } from "./datetime-range-picker/datetime-range-picker.component";
import { CalendarComponent } from "./calendar/calendar.component";
import { CalendarDayComponent } from "./calendar-day/calendar-day.component";
import { CalendarMonthComponent } from "./calendar-month/calendar-month.component";
import { registerLocaleData } from "@angular/common";
import localeDe from "@angular/common/locales/de";

registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    DatetimeRangePickerComponent,
    CalendarComponent,
    CalendarDayComponent,
    CalendarMonthComponent
  ],
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
