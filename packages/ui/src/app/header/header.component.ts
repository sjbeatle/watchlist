import { collectExternalReferences } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAdd = false;

  constructor() { }

  ngOnInit(): void {
  }

  open() {
    console.log('>> TESTING >> open');
    this.isAdd = true;
    document.body.classList.add('add');
  }

  close() {
    this.isAdd = false;
    document.body.classList.remove('add');
  }
}
