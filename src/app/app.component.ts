import { Component } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
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
    canDisplayData: Boolean
    IDs = ["PASS", "NATIONELLT ID", "ANNAN HANDLING", "NEJ"]
   constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createForm();
  }
   createForm() {
   this.angForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(60)]],
      lastname: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[a-zA-Z]+$")]],
      email: ['', [Validators.required, Validators.email]],
      handling: ["", [Validators.required]],
      gender: ['', [Validators.required]],
      phone: ['', [Validators.required], Validators.pattern("^[0-9]{12}")],
      country: ['', [Validators.required]],
      additional_info: ['', [Validators.required, Validators.maxLength(200)]],
      abroadPOB: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      FaststalltId: ['', [Validators.required]],
      UnderlagId: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      other_info: ['', [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      bdate: this.fb.group({
        byear: ['', [Validators.required], Validators.pattern("^[0-9]{4}")],
        bmonth: ['', [Validators.required]],
        bday: ['', [Validators.required]]
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
