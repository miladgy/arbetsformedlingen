import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-validation',
  templateUrl: './form-validation.component.html',
  styleUrls: ['./form-validation.component.css']
})
export class FormValidationComponent {

  constructor() { }

  @Input() fieldName: string;
  @Input() field: any;
  @Input() maxLength: number;

}
