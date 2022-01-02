import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from "@ngxs/store";

import { AppState } from "src/app/store/app.state";
import { NgxsLoggerPluginModule } from "@ngxs/logger-plugin";
import { RequestDataService } from "src/app/services/request-data.service";
import { HttpClientModule } from "@angular/common/http";
import { FlightDataFormComponent } from './components/flight-data-form/flight-data-form.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { ButtonComponent } from './components/button/button.component';
import { DatepickerComponent } from './components/datepicker/datepicker.component';
import { TransfersComponent } from './components/transfers/transfers.component';

@NgModule({
  declarations: [
    AppComponent,
    FlightDataFormComponent,
    AutocompleteInputComponent,
    ButtonComponent,
    DatepickerComponent,
    TransfersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatCheckboxModule,
    HttpClientModule,
    NgxsModule.forRoot(AppState, {
      developmentMode: true
    }),
    NgxsLoggerPluginModule.forRoot()
  ],
  providers: [RequestDataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
