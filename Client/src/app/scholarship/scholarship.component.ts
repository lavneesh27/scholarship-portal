import { Component, OnInit } from '@angular/core';
import { Scholarship } from '../models/scholarship';
import { ScholarshipService } from '../scholarship.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css'],
})
export class ScholarshipComponent implements OnInit {
  scholarship: Scholarship = new Scholarship();
  scholarships: Scholarship[] = [];
  inputScholar: string = '';
  constructor(private service: ScholarshipService, private route: Router) {}
  ngOnInit(): void {
    if (!localStorage.getItem('userId')) {
      this.route.navigate(['login']);
    }
    console.log(localStorage.getItem('userId'));

    this.service.getAllScholarships().subscribe(
      (res) => {
        // filter scholarships based on inputScholar
        this.scholarships = res;
      },
      (err) => {
        console.log('Error occured while inserting data', err);
      }
    );
  }

  search() {
    this.service.getAllScholarships().subscribe(
      (res) => {
        // filter scholarships based on inputScholar
        this.scholarships = res.filter((scholarship: Scholarship) => {
          return scholarship.name
            .toLowerCase()
            .includes(this.inputScholar.toLowerCase());
        });
      },
      (err) => {
        console.log('Error occured while inserting data', err);
      }
    );
  }
  apply(scholarshipId: any) {
    this.service
      .updateUser(scholarshipId, localStorage.getItem('userId')!)
      .subscribe(
        (res) => {
          console.log('success');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
