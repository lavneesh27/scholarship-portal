import { Component, OnInit } from '@angular/core';
import { ScholarshipService } from '../scholarship.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userName: string = '';
  email: string = '';
  scholarships: string[] = [];
  constructor(private service: ScholarshipService) {}
  ngOnInit(): void {
    const id = localStorage.getItem('userId');
    let user = this.service.getUserById(id!).subscribe((res) => {
      this.userName = res.userName;
      this.email = res.email;
      res.scholarships.forEach((element: string) => {
        this.service.getScholarshipById(element).subscribe((res) => {
          this.scholarships.push(res.name);
        });
      });
    });
  }
}
