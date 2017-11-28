import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  LoginForm: FormGroup;
  submit = false;


  constructor(private formbuilder: FormBuilder, private auth: AuthService, private router: Router) {
    this.formbuilder = new FormBuilder();
  }

  ngOnInit() {
    this.LoginForm = this.formbuilder.group({
      username: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(10)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(16)])]
    })
    ;
  }

  onSubmit() {
    this.auth
      .login(this.LoginForm.value)
      .then((response) => {
        localStorage.setItem('API_TOKEN', response.token);
        this.submit = true;
        this.router.navigate(['/admin']);
      });
  }

}
