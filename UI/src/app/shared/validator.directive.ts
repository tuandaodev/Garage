import { Directive, ElementRef, Input, OnInit, Self } from '@angular/core';
import { NgControl } from '@angular/forms';
import { ValidatorType } from '.';

@Directive({
  selector: '[ngxValidator]'
})
export class ValidatorDirective implements OnInit {

  @Input('ngxValidator')
  name: string = '';

  isTranslate: boolean = true;

  constructor(@Self() private ngControl: NgControl, private _el: ElementRef) {}

  ngOnInit(): void {
    this.buildError();
    this.ngControl.statusChanges.subscribe(status => {
      this.buildError();
    });
  }

  private buildError() {
    if (this._el.nativeElement.nextSibling && this._el.nativeElement.nextSibling.classList && this._el.nativeElement.nextSibling.classList.contains('invalid-feedback')) {
      this._el.nativeElement.nextSibling.remove();
    }
    if (this.ngControl.errors) {
      const errorDiv = this.getErrors();
      this.insertAfter(errorDiv, this._el.nativeElement);
    }
  }

  private getErrors() {
    let errorDiv = document.createElement("div");
    errorDiv.id = this.ngControl.name + "_" + "error";  // for automation test
    errorDiv.classList.add('invalid-feedback');

    // Object.keys(this.ngControl.errors).forEach(function(errorKey) {
    // }, this);
    const errorKey = Object.keys(this.ngControl.errors)[0];
    let message = "";
    let params = {'name': this.isTranslate ? this.name : this.name};
    switch (errorKey) {
      case ValidatorType.REQUIRED:
        message = "This field is required";
        break;
      case ValidatorType.REQUIREDTRUE:
        message = "This field is required";
        break;
      case ValidatorType.PATTERN:
        message = "validator.pattern";
        break;
      case ValidatorType.EMAIL:
        message = "validator.email";
        break;
      case ValidatorType.MAX:
        params['value'] = this.ngControl.errors[errorKey]['max'];
        message = "This field must be at least " + params['value'];
        break;
      case ValidatorType.MIN:
        params['value'] = this.ngControl.errors[errorKey]['min'];
        message = "This field may not be greater than " + params['value'];
        break;
      case ValidatorType.MAXLENGTH:
        message = "validator.maxlength";
        params['value'] = this.ngControl.errors[errorKey]['requiredLength'];
        break;
      case ValidatorType.MINLENGTH:
        message = "validator.minlength";
        params['value'] = this.ngControl.errors[errorKey]['requiredLength'];
        break;
      case ValidatorType.EXACTLENGTH:
        message = "validator.exactlength";
        params['value'] = this.ngControl.errors[errorKey]['requiredLength'];
        break;
  
    }
    if (message) {
      if (this.name) {
        // message = this.translateService.instant(message, params);
      } else {
        // message = this.translateService.instant(message);
      }
      let childDiv = document.createElement("div");
      childDiv.id = this.ngControl.name + "_error_" + errorKey;  // for automation test
      childDiv.innerHTML = this.capitalizeFirstLetter(message.toLowerCase());
      errorDiv.appendChild(childDiv);
    }

    return errorDiv;
  }

  insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
  }

  capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}