import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [UserService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class LoginComponent implements OnInit {
  success = false;
  failure = false;
  emailErrorMessage: string = '';
  loginForm: FormGroup;

  private userService = inject(UserService);
  private router = inject(Router);

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
      ]),
      password: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  Login(submitData: FormGroup) {
    this.success = false;
    this.failure = false;
    this.userService.login(submitData.value.email, submitData.value.password).subscribe({
      next: (user) => {
        if (user.accessToken) {
          this.success = true;
          const userRole = localStorage.getItem('userRole');
          if (userRole === 'ROLE_USER') {
            this.router.navigate(['/home']);
          } else if (userRole === 'ROLE_ADMIN') {
            this.router.navigate(['/adminHome']);
          }
        } else {
          this.failure = true;
        }
      },
      error: (err) => {
        Swal.fire({
          title: `<strong>${err.error.message}</strong>`,
          icon: 'error',
          html: 'Try again.',
          showCloseButton: true,
          focusConfirm: false,
          confirmButtonText: 'OK',
          confirmButtonColor: '#5c127e',
        });
      },
    });
  }
}
