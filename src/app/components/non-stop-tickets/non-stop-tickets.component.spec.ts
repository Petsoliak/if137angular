import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { NonStopTicketsComponent } from './non-stop-tickets.component';
import { FlightsInfoService } from 'src/app/services/flights-info.service';
import { RequestDataState } from 'src/app/store/request-data.state';
import { RequestDataService } from 'src/app/services/request-data.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { FlightInfoState } from 'src/app/store/flight-info.state';
import { appState } from 'src/app/store/app.state';
import { GetNonStopTickets } from 'src/app/store/flight-info.action';

fdescribe('NonStopTicketsComponent', () => {
  let component: NonStopTicketsComponent;
  let fixture: ComponentFixture<NonStopTicketsComponent>;

  let flightsInfoServiceMock: any;
  let requestDataServiceMock: any;

  let store: any;
  let storeMock: any;
  let formDataSubject = new Subject();
  let nonStopTicketSubject = new Subject();
  let RequestDataStateSubject = new Subject();

  beforeEach(async () => {
    flightsInfoServiceMock = jasmine.createSpy().and.returnValue({});

    storeMock = {
      select: jasmine
        .createSpy('select')
        .withArgs(RequestDataState.formData)
        .and.returnValue(formDataSubject.asObservable())
        .withArgs(FlightInfoState.nonStopTickets)
        .and.returnValue(nonStopTicketSubject.asObservable())
        .withArgs(RequestDataState.currency)
        .and.returnValue(RequestDataStateSubject.asObservable()),
        dispatch: jasmine.createSpy('dispatch'),
      selectSnapshot: jasmine.createSpy('selectSnapshot'),
    };

    await TestBed.configureTestingModule({
      declarations: [NonStopTicketsComponent],
      imports: [
        NgxsModule.forRoot(appState, {
          developmentMode: true,
        }),
      ],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: FlightsInfoService, useValue: flightsInfoServiceMock },
        { provide: RequestDataService, useValue: requestDataServiceMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NonStopTicketsComponent);
    store = TestBed.inject(Store)
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    formDataSubject.complete();
    nonStopTicketSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  
  describe('#ngOnInit', () => {
    it('should dispatch GetNonStopTickets whith parametrs', () => {
      const payload = {
        destinationFrom: { code: 'KRK' },
        destinationTo: { code: 'DTM' },
        startDate: new Date('2022-03-22'),
        endDate: new Date('2022-03-26'),
        isFormValid: true
      }
      formDataSubject.next(payload);
      
    component.ngOnInit();
   
    expect(store.dispatch).toHaveBeenCalledWith(
      new GetNonStopTickets(payload as any)
    );
   });         
  });  
});

