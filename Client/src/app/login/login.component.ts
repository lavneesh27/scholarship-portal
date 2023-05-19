import { Component } from '@angular/core';
import { ScholarshipService } from '../scholarship.service';
import { Router } from '@angular/router';
import { Register } from '../models/register';
import { ToastrService } from 'ngx-toastr';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private service: ScholarshipService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  email: string = '';
  password: string = '';

  submit() {
    this.service.getUsers().subscribe(
      (res: Register[]) => {
        const user = res.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (user) {
          localStorage.setItem('userId', user._id!);
          localStorage.setItem('toastrMessage', 'You are logged in.');
          this.toastr.success('You are logged in.');
          setTimeout(() => {
            location.reload();
          }, 1500);
          this.route.navigate(['scholarship']);
        } else {
          this.toastr.error('Something went wrong');
        }
      },
      (err) => {
        console.log('error occured', err);
      }
    );
  }
}
