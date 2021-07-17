import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AppService } from '../../../shared';
import { CheckInResultModel } from '../../../shared/models/location.model';
import { VehicleTypeModel } from '../../../shared/models/vehicle.model';

@Component({
  selector: 'ngx-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.scss']
})
export class CheckinComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  public licensePlate: string;
  public checkinResult: CheckInResultModel;
  public vehicleTypes: VehicleTypeModel[];
  public vehicleTypeId: number;

  subscriptions: Subscription[] = [];

  constructor(
    private _appService: AppService,
    private _messageService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getVehicleTypes();
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0)
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      })
  }

  public getVehicleTypes() {
    this.isLoading = true;
    const sub = this._appService.vehicleService.getVehicleTypes().subscribe(res => {
      this.isLoading = false;
      this.vehicleTypes = res;
      this.vehicleTypeId = this.vehicleTypes[0].vehicleTypeId;
    }, (err) => {
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    }, () => {
      this.isLoading = false;
    });
    this.addSub(sub);
  }

  onScan($event) {
    $event.preventDefault();
    this.scan();
  }

  scan() {
    if (this.isLoading) return;
    let licensePlate: string = this.licensePlate;
    if (!licensePlate) return;
    licensePlate = licensePlate.trim();
    // clear input
    this.licensePlate = null;
    this.resetData();
    
    const submitData = {
      licensePlate,
      vehicleTypeId: this.vehicleTypeId
    }

    this.isLoading = true;
    const sub = this._appService.locationService.checkin(submitData).subscribe(checkInRes => {
      this.checkinResult = checkInRes;
      this._messageService.success(null, "Checkin success!");
      this.isLoading = false;
    }, (err: HttpErrorResponse) => {
      this.resetData();
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    });
    this.addSub(sub);
  }

  private resetData() {
  }

  private addSub(sub: Subscription) {
    this.subscriptions.push(sub);
  }
 
}
