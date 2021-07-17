import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbRadioModule,
  NbSelectModule,
  NbAutocompleteModule,
  NbDatepickerModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbDialogModule,
  NbTreeGridModule,
  NbCalendarRangeModule,
  NbSpinnerModule,
  NbProgressBarModule,
  NbBadgeModule,
  NbAccordionModule,
  NbCardModule,
  NbStepperModule,
  NbListModule,
  NbTabsetModule,
  NbActionsModule,
  NbWindowModule,
  NbUserModule,
  NbAlertModule,
  NbLayoutModule,
  NbMenuModule,
  NbTooltipModule,
  NbToastrModule,
  NbIconModule,
  NbFormFieldModule,
} from '@nebular/theme';
import { ThemeModule } from '../@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ValidatorDirective } from './validator.directive';
import { AutoFocusDirective } from './auto-focus.directive';

const COMPONENTS = [
];


export const MODULES = [
  NbButtonModule,
  NbInputModule,
  NbCheckboxModule,
  NbToggleModule,
  NbRadioModule,
  NbSelectModule,
  NbAutocompleteModule,
  NbDatepickerModule,
  NbPopoverModule,
  NbContextMenuModule,
  NbTreeGridModule,
  NbCalendarRangeModule,
  NbSpinnerModule,
  NbProgressBarModule,
  NbBadgeModule,
  NbAccordionModule,
  NbCardModule,
  NbStepperModule,
  NbListModule,
  NbTabsetModule,
  NbActionsModule,
  NbUserModule,
  NbAlertModule,
  NbLayoutModule,
  NbMenuModule,
  NbTooltipModule,
  NbToastrModule,
  NbIconModule,
  NbFormFieldModule,
  NbEvaIconsModule,
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ValidatorDirective,
    AutoFocusDirective,
    ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbDialogModule.forChild(),
    NbWindowModule.forChild(),
    ...MODULES,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ThemeModule,
    NbDialogModule,
    NbWindowModule,
    ...MODULES,
    ...COMPONENTS,
    ValidatorDirective,
    AutoFocusDirective
  ],
})
export class SharedModule { }
