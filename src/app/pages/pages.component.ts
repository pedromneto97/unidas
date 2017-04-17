import { Component, OnInit } from '@angular/core';
import {PagesService} from './pages.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
  providers: [PagesService]
})
export class PagesComponent implements OnInit {

  constructor(private pagesService: PagesService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

}
