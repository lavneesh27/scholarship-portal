import { Component } from '@angular/core';
import { Scholarship } from '../models/scholarship';
import { ScholarshipService } from '../scholarship.service';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css'],
})
export class ScholarshipComponent {
  constructor(private service: ScholarshipService) {}
  scholarship: Scholarship = new Scholarship();
  scholarships: Scholarship[] = [];
  inputScholar: string = '';

  search() {
    console.log(this.inputScholar);
    this.service.getAllScholarships().subscribe(
      (res) => {
        // filter scholarships based on inputScholar
        this.scholarships = res.filter((scholarship: Scholarship) => {
          return scholarship.name
            .toLowerCase()
            .includes(this.inputScholar.toLowerCase());
        });
        console.log(this.scholarships);
      },
      (err) => {
        console.log('Error occured while inserting data', err);
      }
    );
  }
}
