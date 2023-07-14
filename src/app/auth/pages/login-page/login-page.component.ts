import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { AuthServiceService } from '../../services/auth-service.service';


@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  host: {'login-host': 'login'},
})
export class LoginPageComponent {

  private fb = inject( FormBuilder );
  private authService = inject( AuthServiceService );
  private router = inject( Router );

  public myForm: FormGroup = this.fb.group({
    email: ['jsalazar@google.com',[ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(6)]],
  })

  login(){

    const {email, password } = this.myForm.value;

    this.authService.login(email, password)
    .subscribe( {
      next: () => this.router.navigateByUrl('/dashboard'),
      error: (errorMessage) => {
        Swal.fire('Error', errorMessage, 'error');
      }


    })

  }

}
