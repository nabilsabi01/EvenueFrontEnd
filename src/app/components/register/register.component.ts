import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
}
from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, SweetAlert2Module],
  providers: [UserService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  role = 'user';
  success = false;
  failure = false;

  constructor(private usrsrv: UserService, private router: Router) {}
  emailErrorMessage: string = '';
  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(10),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
    ]),
    password: new FormControl(null, [Validators.required]),
    role: new FormControl('user'),
  });

  Register(submitData: any) {
    const formData = new FormData();
    formData.append('name', submitData.get('name').value);
    formData.append('email', submitData.get('email').value);
    formData.append('password', submitData.get('password').value);
    formData.append('role', submitData.get('role').value);
    this.usrsrv.addUser(formData).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.message == 'success') {
          this.success = true;
          console.log('success');
          this.router.navigate(['/login']);
        } else {
          this.failure = true;
          this.emailErrorMessage = res.message;
        }
      },
      error: (err) => {
        // Swal.fire(err.error.message);
        Swal.fire({
          title: `<strong>${err.error.message}</strong>`,
          icon: 'info',
          html: `
                Try to login.
              `,
          showCloseButton: true,
          // showCancelButton: true,
          focusConfirm: false,
          confirmButtonText: `
                 OK
              `,
          confirmButtonColor: '#5c127e',
        });
      },
    });
  }
}
