import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from './../../shared/shared.module';
import { CheckinComponent } from './checkin/checkin.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ManageLocationComponent } from './manage/manage.component';

@NgModule({
  declarations: [
    ManageLocationComponent,
    CheckinComponent,
    CheckoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class LocationModule { }
