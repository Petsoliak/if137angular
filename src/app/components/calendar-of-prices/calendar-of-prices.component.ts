import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { map } from 'rxjs';
import {
  CalendarOfPricesModel,
  CalendarOfPricesPayload,
  CalendarOfPricesStateModel,
} from 'src/app/models/calendar-of-prices.model';
import { FormDataModel } from 'src/app/models/formData.model';
import {
  CalendarOfPricesLoaded,
  CalendarOfPricesRequested,
} from 'src/app/store/flight-info.action';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { RequestDataState } from 'src/app/store/request-data.state';

@Component({
  selector: 'app-calendar-of-prices',
  templateUrl: './calendar-of-prices.component.html',
  styleUrls: ['./calendar-of-prices.component.scss'],
})
export class CalendarOfPricesComponent implements OnInit {
  calendarData: CalendarOfPricesStateModel;
  formData: CalendarOfPricesPayload;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store
      .select(FlightInfoState.calendarOfPrices)
      .subscribe((state) => (this.calendarData = state));
    this.store
      .select(RequestDataState.formData)
      .pipe(
        map((state: FormDataModel) => ({
          origin: state.destinationFrom.name,
          destination: state.destinationTo.name,
          originCode: state.destinationFrom.code,
          destinationCode: state.destinationTo.code,
          return_date: state.endDate.toISOString().split('T')[0],
          depart_date: state.startDate.toISOString().split('T')[0],
        }))
      )
      .subscribe((data: CalendarOfPricesPayload) => {
        this.store.dispatch([
          new CalendarOfPricesRequested(),
          new CalendarOfPricesLoaded(data),
        ]);
        this.formData = data;
      });
  }
}
