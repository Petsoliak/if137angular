export interface FilterConfigModel {
  maxPrice: number;
  minPrice: number;
  airline: boolean;
  airline_titles: boolean;
  expires: boolean;
  destination?: boolean;
  // For test, change to your elements
  flightClass?: boolean;
  gate?: boolean;

}
