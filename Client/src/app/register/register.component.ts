import { Component } from '@angular/core';
import { Register } from '../models/register';
import { ScholarshipService } from '../scholarship.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  register: Register = new Register();

  constructor(private service: ScholarshipService) {}
  submit() {
    this.service.createUser(this.register).subscribe(
      (res) => {
        alert('User Created');
        console.log(res);
      },
      (err) => {
        alert('Something wrong occured');
        console.log(err);
      }
    );
    console.log(this.register);
  }
}
