import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  IDs = ["PASS", "ID", "OTHER", "NO"]
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.createForm();
  }
  createForm() {
    this.angForm = this.fb.group({
      officer: this.fb.group({
        firstname: ['', [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z]+$")]],
        lastname: ['', [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z]+$")]],
        email: ['', [Validators.required, Validators.maxLength(60), Validators.email]],
        phone: ['', [Validators.required, Validators.maxLength(15), Validators.pattern("^[0-9]{12}")]]
        // upload: ["", [Validators.required]]
      }),
      user: this.fb.group({
        firstname: ['', {
          validators: [Validators.required, Validators.maxLength(80), Validators.pattern("^[a-zA-Z]+$")],
          updateOn: 'blur'
        }],
        lastname: ['', [Validators.required, Validators.maxLength(60), Validators.pattern("^[a-zA-Z]+$")]],
        email: ['', [Validators.required, Validators.email]],
        gender: ['', [Validators.required]],
        phone: ['', [Validators.required, Validators.pattern("^[0-9]{12}")]],
        country: ['', [Validators.required]],
        additional_info: ['', [Validators.maxLength(200)]],
        abroadPOB: ['', [Validators.required, Validators.maxLength(40), Validators.pattern("^[a-zA-Z]+$")]],
        bdate: this.fb.group({
          byear: ['', [Validators.required, Validators.pattern("^[0-9]{4}")]],
          bmonth: ['', [Validators.required, Validators.pattern("([1-9]|1[0-2])")]],
          bday: ['', [Validators.required, Validators.pattern("([1-9]|[12][0-9]|3[01])")]]
        }),
        address: this.fb.group({
          city: ['', [Validators.required]],
          street: ['', [Validators.required, Validators.maxLength(35)]],
          apartmentNumber: ['', [Validators.required, Validators.maxLength(4)]],
          postcity: ['', [Validators.required, Validators.maxLength(27)]],
          postcode: ['', [Validators.required, Validators.maxLength(5)]]
        }),
      }),
      case: this.fb.group({
        FId: ['', [Validators.required, Validators.maxLength(14)]],
        UId: ['', [Validators.required, Validators.maxLength(80), Validators.pattern("^[a-zA-Z]+$")]],
        other_info: ['', [Validators.maxLength(200), Validators.pattern("^[a-zA-Z]+$")]],
      })
    }
    )
  }

  async ngOnInit() {

    this.countries = await this.dataService.sendGetRequest().toPromise()
    this.canDisplayData = true;
  }

  get officer_firstname() {
    return this.angForm.get("officer").get('firstname');
  }

  get officer_lastname() {
    return this.angForm.get("officer").get("lastname");
  }

  get officer_email() {
    return this.angForm.get("officer").get("email");
  }

  get officer_phone() {
    return this.angForm.get("officer").get("phone");
  }

/*   get officer_upload() {
    return this.angForm.get("officer").get("officer_upload");
  } */

  get firstname() {
    return this.angForm.get("user").get('firstname');
  }

  get lastname() {
    return this.angForm.get("user").get('lastname');
  }

  get additional_info() {
    return this.angForm.get("user").get("additional_info")
  }

  get abroadPOB() {
    return this.angForm.get("user").get("abroadPOB")
  }

  get email() {
    return this.angForm.get("user").get('email');
  }

  get gender() {
    return this.angForm.get("user").get('gender');
  }

  get phone() {
    return this.angForm.get("user").get('phone');
  }

  get country() {
    return this.angForm.get("user").get('country');
  }

  get city() {
    return this.angForm.get("user").get("address").get('city');
  }

  get street() {
    return this.angForm.get("user").get("address").get('street');
  }

  get apartmentNumber() {
    return this.angForm.get("user").get("address").get('apartmentNumber');
  }

  get postcode() {
    return this.angForm.get("user").get("address").get('postcode');
  }

  get postcity() {
    return this.angForm.get("user").get("address").get('postcity');
  }

  get byear() {
    return this.angForm.get("user").get("bdate").get("byear")
  }

  get bmonth() {
    return this.angForm.get("user").get("bdate").get("bmonth")
  }

  get bday() {
    return this.angForm.get("user").get("bdate").get("bday")
  }

  get FId() {
    return this.angForm.get("case").get("FId")
  }

  get UId() {
    return this.angForm.get("case").get("UId")
  }

  get other_info() {
    return this.angForm.get("case").get("other_info")
  }


  onSubmit() {
    //console.log(this.angForm.value);
    console.log(this.angForm.value)
    this.post()

  }

  post() {
    return this.dataService.register(this.angForm.value).subscribe(x => console.log(x));
  }

  public checkIfDateIsValid = (): boolean => {
    const day = this.angForm.value.user.bdate.bday;
    const month = this.angForm.value.user.bdate.bmonth;
    const year = this.angForm.value.user.bdate.byear;
    if (day && month && year) {
      const date = new Date(year, month, day);
      const currentDate = new Date();
      if (currentDate < date) return false;
    }
    return true;
  }

}