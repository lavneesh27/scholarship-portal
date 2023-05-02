import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  isLogged = localStorage.getItem('userId');

  Logout() {
    localStorage.clear();
    window.location.reload();
  }
}
