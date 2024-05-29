import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

 public isMenuOpen: boolean = false;

 toggleMenu() {
  this.isMenuOpen = !this.isMenuOpen;
}

}