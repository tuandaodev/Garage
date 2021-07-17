import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { AppService } from '../../../shared';

@Component({
  selector: 'ngx-manage-location',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageLocationComponent implements OnInit, OnDestroy {

  public isLoading = false;

  public formGroup: FormGroup;

  public levels: number[];
  public levelId: number;

  public locations: any;

  private subscription: Subscription[] = [];

  constructor(
    private _fb: FormBuilder, 
    private _appService: AppService, 
    private _messageService: NbToastrService
    ) { }

  ngOnInit(): void {
    this.initForm();
    this.getLevels();
  }

  ngOnDestroy(): void {
    if (this.subscription.length) {
      this.subscription.forEach(sub => {
        sub.unsubscribe();
      });
    }
  }

  private initForm() {
    this.formGroup = this._fb.group({
      level: [null, [Validators.required, Validators.min(1)]],
      maxX: [null, [Validators.required, Validators.min(1)]],
      maxY: [null, [Validators.required, Validators.min(1)]],
    });
  }

  private reset = () => {
    this.formGroup.reset();
    this.locations = [];
    this.levels = [];
    this.levelId = null;
    this.getLevels();
  }

  public getLevels() {
    this.isLoading = true;
    const sub = this._appService.locationService.getLevels().subscribe(levelsRes => {
      this.isLoading = false;
      this.levels = levelsRes;
      this.formGroup.patchValue({
        level: levelsRes?.length > 0 ? levelsRes[0] + 1 : 1
      });

    }, (err) => {
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    }, () => {
      this.isLoading = false;
    });
    this.subscription.push(sub);
  }

  public onChangeLevel($event: any) {
    if (!this.levelId) return;
    this.isLoading = true;
    const sub = this._appService.locationService.getBriefLocations({ Level: this.levelId }).subscribe(locationRes => {
      this.isLoading = false;
      this.locations = locationRes;
    }, (err) => {
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    }, () => {
      this.isLoading = false;
    });
    this.subscription.push(sub);
  }

  public onSubmitCreateLocation() {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      return;
    }

    let submitData = {
      ...this.formGroup.value,
    };

    this.isLoading = true;
    const sub = this._appService.locationService.createLocation(submitData).subscribe(_res => {
      this.isLoading = false;
      this._messageService.success(null, "Create level success!");
      this.reset();
    }, (err) => {
      console.log(err, err.ErrorMessage);
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    }, () => {
      this.isLoading = false;
    });
    this.subscription.push(sub);
  }

  public onSubmitDeleteLevel() {
    if (!this.levelId) return;
    this.isLoading = true;
    const sub = this._appService.locationService.deleteLevel(this.levelId).subscribe(_res => {
      this.isLoading = false;
      this._messageService.success(null, "Delete level success!");
      this.reset();
    }, (err) => {
      console.log(err, err.ErrorMessage);
      this.isLoading = false;
      this._messageService.danger(null, err.error.ErrorMessage);
    }, () => {
      this.isLoading = false;
    });
    this.subscription.push(sub);
  }

  public onResetForm() {
    this.reset();
  }

}
