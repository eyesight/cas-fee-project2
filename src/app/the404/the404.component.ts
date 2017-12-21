import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-the404',
  templateUrl: './the404.component.html'
})
export class The404Component implements OnInit {

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['/home'])
    }, 5000);
  }
}
