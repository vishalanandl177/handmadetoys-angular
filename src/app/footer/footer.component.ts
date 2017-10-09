import { Component, OnInit } from '@angular/core';
import { Inject} from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { FormGroup, FormsModule, FormControl, Validators } from '@angular/forms';
import { MyService } from '../services/app.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent implements OnInit {
  myForm: FormGroup;
  email: string = '';
  validData = false;
  emailValue: string = '';

  ngOnInit() {
    this.myForm = new FormGroup({
      'email': new FormControl(this.email, [
          Validators.required,
          Validators.minLength(4)
        ])
  });
  }
  constructor(private http: Http, private service: MyService) {}
  sendEmail(email){
    this.emailValue = email;
    if(!this.isValidMailFormat(email)){
      this.service.newsLetter(email)
      .subscribe(
        data => this.emailSent(data)
      );
    }else{
      console.log("error in email");
    }
  }

  isValidMailFormat(value: string){
    let EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    if (value != "" && EMAIL_REGEXP.test(value)) {
        return false;
    }
    return true;
  }
  emailSent(arg: any): any{
    if(arg['status'] == 'success'){
      alert('successful');
      this.emailValue = '';
    }
  }
}