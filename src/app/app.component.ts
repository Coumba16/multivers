import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TestEditComponent } from './test-edit/test-edit.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'multivers-test';

  constructor(
    private _dialog: MatDialog,

    private _testService: TestService,
   // private _coreService: CoreService
  ) {}
 
  ngOnInit(): void {
    this.getTestList();
  }

  export class AppComponent implements OnInit {
    displayedColumns: string[] = [
      'id',
      'firstName',
      'lastName',
      'email',
      'date',
      'gender',
      'language',
      'github',
      'competence',
      'experience',      
      'action',
    ];
    dataSource!: MatTableDataSource<any>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;


    openAddEditTestForm() {
      const dialogRef = this._dialog.open(TestAddEditComponent);
      dialogRef.afterClosed().subscribe({
        next: (val) => {
          if (val) {
            this.getTestList();
          }
        },
      });
    }
  }

  getTestList() {
    this._testService.getTestList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

