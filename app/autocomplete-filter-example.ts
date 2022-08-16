import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';

export interface PeriodicElement {
  name: string;
  age: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  { name: 'Sachin Tendulkar', age: 42 },
  { name: 'Virat Kohli', age: 30 },
  { name: 'Rohith Sharma', age: 36 },
];

@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample implements OnInit {
  displayedColumns: string[] = ['name', 'age'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  myControl = new FormControl();
  options: string[] = ['Sachin Tendulkar', 'Virat Kohli', 'Rohith Sharma'];
  filteredOptions: Observable<PeriodicElement[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  private _filter(value: string): PeriodicElement[] {
    if (value) {
      const filterValue = value.toLowerCase();
      const filteredSet = ELEMENT_DATA.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
      this.dataSource = new MatTableDataSource(filteredSet);
      return filteredSet;
    } else {
      return [];
    }
  }
}

/**  Copyright 2018 Google Inc. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */
