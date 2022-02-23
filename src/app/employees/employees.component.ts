import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatTableDataSource } from '@angular/material/table';

// import { AllEmployee } from '../models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent implements OnInit, AfterViewInit {
  contactForm = new FormGroup({});
  Employees: any[] = [];
  selectedEmp: any = {};
  display = 'none';
  // employeeData!: AllEmployee;
  id: any;
  page = 1;
  type = 'asc';
  sortKey = '';
  dataSource = new MatTableDataSource(this.Employees);

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private _liveAnnouncer: LiveAnnouncer // private allEmployee: AllEmployee
  ) {}

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.getAllEmp();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllEmp() {
    this.apiService.getAll().subscribe((res: any) => {
      this.Employees = res;
      console.log('employees', this.Employees);
    });
  }

  empById(id: any) {
    this.apiService.getEmpById(id).subscribe((data: any) => {
      this.selectedEmp = data;
    });
  }

  searchByName(e: any) {
    console.log('eeee', e.target.value);
    this.apiService.searchEmp(e.target.value).subscribe((data: any) => {
      this.Employees = data;
    });
  }

  paginationForEmp() {
    this.apiService.paginationList(this.page).subscribe((data: any) => {
      this.Employees = this.Employees.concat(data);
      this.page = this.page + 1;
    });
  }

  sortingEmp(sortKey: string, type: string) {
    this.apiService.sortingOfEmp(sortKey, type).subscribe((data: any) => {
      if (type === 'desc') {
        this.type = 'asc';
      }
      this.Employees = data;
    });
  }

  openModal() {
    this.display = 'block';
  }
  onCloseHandled() {
    this.display = 'none';
  }

  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
