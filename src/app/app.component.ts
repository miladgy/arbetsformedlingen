import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators, AbstractControl, ValidatorFn  } from '@angular/forms';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'AfForm';
    angForm: FormGroup;
    countries = [];
    canDisplayData: Boolean;
    IDs = ["PASS", "NATIONELLT ID", "ANNAN HANDLING", "NEJ"]
   constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createForm();
  }
   createForm() {
   this.angForm = this.fb.group({
      firstname: ['', {
        validators: [Validators.required, Validators.maxLength(80)],
        updateOn: 'blur'
      }],
      lastname: ['', [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required], Validators.pattern("^[0-9]{12}")],
      country: ['', [Validators.required]],
      additional_info: ['', [Validators.required, Validators.maxLength(200)]],
      abroadPOB: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      FaststalltId: ['', [Validators.required]],
      UnderlagId: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      other_info: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      bdate: this.fb.group({
        byear: ['', [Validators.required, Validators.pattern("^[0-9]{4}"), dateValidator]],
        bmonth: ['', [Validators.required,Validators.pattern("^(0[1-9]|1[012])$"), dateValidator]],
        bday: ['', [Validators.required,Validators.pattern("(0[1-9]|[12]\d|3[01])"), dateValidator]]
      }),
      address: this.fb.group({
        city: ['', [Validators.required]],
        street: ['', [Validators.required]],
        postort: ['', [Validators.required]],
        postcode: ['', [Validators.required]]
      })
    });
  }

  async ngOnInit() {
    
    this.countries = await this.dataService.sendGetRequest().toPromise()
    this.canDisplayData = true;
  }
  
  get firstname() {
    return this.angForm.get('firstname');
  }
 
  get lastname() {
    return this.angForm.get('lastname');
  }
 
  get email() {
    return this.angForm.get('email');
  }
 
  get gender() {
    return this.angForm.get('gender');
  }
 
  get phone() {
    return this.angForm.get('phone');
  }
 
  get country() {
    return this.angForm.get('country');
  }
 
  get city() {
    return this.angForm.get("address").get('city');
  }
 
  get street() {
    return this.angForm.get("address").get('street');
  }
 
  get postcode() {
    return this.angForm.get("address").get('postcode');
  }

  get postort() {
    return this.angForm.get("address").get('postort');
  }

  get byear() {
    return this.angForm.get("bdate").get("byear")
  }

  get bmonth() {
    return this.angForm.get("bdate").get("bmonth")
  }

  get bday() {
    return this.angForm.get("bdate").get("bday")
  }

  get additional_info() {
    return this.angForm.get("additional_info")
  }

  get abroadPOB(){
    return this.angForm.get("abroadPOB")
  }

  get FaststalltId(){
    return this.angForm.get("FaststalltId")
  }

  get UnderlagId(){
    return this.angForm.get("UnderlagId")
  }

  get other_info(){
    return this.angForm.get("other_info")
  }


  onSubmit() {
    console.log(this.angForm.value);
  }

}

function dateValidator(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    const today = new Date().getTime();
    console.log(new Date().getFullYear)

    if(!(control && control.value)) {
      // if there's no control or no value, that's ok
      return null;
    }

    // return null if there's no errors
    return control.value.getTime() > today 
      ? {invalidDate: 'You cannot use future dates' } 
      : null;
  }
}
