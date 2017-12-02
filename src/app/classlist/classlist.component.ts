/**
 * Created by awedag on 14.10.17.
 */
import { Component, OnInit } from '@angular/core';
import { Klasse } from '../_models/klasse.model';


@Component({
  selector: 'app-classlist',
  templateUrl: './classlist.component.html'
})
export class ClasslistComponent implements OnInit {

  klasse: Klasse;

  constructor() { }

  ngOnInit() {
  }

}
