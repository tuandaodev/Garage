import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AppService } from '../../../shared';
import { CheckInResultModel } from '../../../shared/models/location.model';

@Component({
  selector: 'ngx-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnDestroy {

  isLoading: boolean;

  public licensePlate: string;
  public checkoutResult: CheckInResultModel;

  subscriptions: Subscription[] = [];

  constructor(
    private _appService: AppService,
    private _messageService: NbToastrService
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.subscriptions.length > 0)
      this.subscriptions.forEach(sub => {
        sub.unsubscribe();
      })
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
    }

    this.isLoading = true;
    const sub = this._appService.locationService.checkout(submitData).subscribe(checkInRes => {
      this.checkoutResult = checkInRes;
      this._messageService.success(null, "Checkout success!");
      this.isLoading = false;
    }, (err: HttpErrorResponse) => {
      this.resetData();
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    });
    this.addSub(sub);
  }

  private resetData() {
    this.checkoutResult = null;
  }

  private addSub(sub: Subscription) {
    this.subscriptions.push(sub);
  }
 
}
