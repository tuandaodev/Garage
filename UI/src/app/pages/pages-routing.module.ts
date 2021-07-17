import { CheckoutComponent } from './location/checkout/checkout.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckinComponent } from './location/checkin/checkin.component';
import { ManageLocationComponent } from './location/manage/manage.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { PagesComponent } from './pages.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'checkin',
      component: CheckinComponent,
    },
    {
      path: 'checkout',
      component: CheckoutComponent,
    },
    {
      path: 'manage',
      component: ManageLocationComponent,
    },
    {
      path: 'miscellaneous',
      loadChildren: () => import('./miscellaneous/miscellaneous.module')
        .then(m => m.MiscellaneousModule),
    },
    {
      path: '',
      redirectTo: 'checkin',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
