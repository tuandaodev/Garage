import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment';
import { LocationService } from './location.service';
import { VehicleService } from './vehicle.service';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _apiUrl: string;
  private _locationService: LocationService;
  private _vehicleService: VehicleService;

  constructor(
    private _http: HttpClient,
  ) {
    this._apiUrl = environment.apiUrl;
  }

  public get locationService() {
    if (!this._locationService) {
      this._locationService = new LocationService(this._http, this._apiUrl);
    }
    return this._locationService;
  }

  public get vehicleService() {
    if (!this._vehicleService) {
      this._vehicleService = new VehicleService(this._http, this._apiUrl);
    }
    return this._vehicleService;
  }
}
