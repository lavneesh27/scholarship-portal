import { Component } from '@angular/core';
import { ScholarshipService } from '../scholarship.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(private service: ScholarshipService) {}
  email: string = '';
  password: string = '';

  submit() {
    this.service.getUsers().subscribe(
      (res: any[]) => {
        const user = res.find(
          (user) => user.email === this.email && user.password === this.password
        );
        if (user) {
          alert('Login Successful');
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
