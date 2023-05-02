import { Component } from '@angular/core';
import { ScholarshipService } from '../scholarship.service';
import { Router } from '@angular/router';
import { Register } from '../models/register';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private service: ScholarshipService, private route: Router) {}
  email: string = '';
  password: string = '';

  submit() {
    this.service.getUsers().subscribe(
      (res: Register[]) => {
        const user = res.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (user) {
          alert('Login Successful');
          localStorage.setItem('userId', user._id!);

          this.route.navigate(['scholarship']).then(() => {
            window.location.reload();
          });
        } else {
          alert('Login Failure');
        }
      },
      (err) => {
        console.log('error occured', err);
      }
    );
  }
}
