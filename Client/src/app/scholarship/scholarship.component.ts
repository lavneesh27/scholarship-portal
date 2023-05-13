import { Component, OnInit } from '@angular/core';
import { Scholarship } from '../models/scholarship';
import { ScholarshipService } from '../scholarship.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.css'],
})
export class ScholarshipComponent implements OnInit {
  scholarship: Scholarship = new Scholarship();
  scholarships: Scholarship[] = [];
  inputScholar: string = '';
  constructor(
    private service: ScholarshipService,
    private route: Router,
    private toastr: ToastrService
  ) {}
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
        this.scholarships = res.filter((scholarship: Scholarship) => {
          const searchFields = [
            scholarship.name,
            scholarship.eligibility,
            scholarship.about,
            scholarship.amount,
            scholarship.apply_link,
          ];
          const searchText = this.inputScholar.toLowerCase();

          return searchFields.some((field) =>
            field.toLowerCase().includes(searchText)
          );
        });
      },
      (err) => {
        console.log('Error occured while inserting data', err);
      }
    );
  }

  save(scholarshipId: any) {
    this.service
      .updateUser(scholarshipId, localStorage.getItem('userId')!)
      .subscribe(
        (res) => {
          this.toastr.success('Saved Successfully');
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
