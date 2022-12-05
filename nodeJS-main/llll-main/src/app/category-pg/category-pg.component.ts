import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
;
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { companymodel } from '../Model/companymodel';
import { ApiService } from '../shared/api.service';
import { PopupComponent } from '../popup/popup.component';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryPopupComponent } from './category-popup/category-popup.component';

@Component({
  selector: 'app-category-pg',
  templateUrl: './category-pg.component.html',
  styleUrls: ['./category-pg.component.css']
})
export class CategoryPgComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  companydata!: companymodel[];
  finaldata:any;
  prgorammers:any[] = []
  tech:any[] = []
  apiResponse:any

  
  
  constructor(private dialog: MatDialog, private api: ApiService,private router:Router,private toastr: ToastrService,private builder: FormBuilder,) { }

  displayedColums?: string[] = ["id", "categoryName", "action"]
  dataSource!:MatTableDataSource<any>;

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    categoryName: this.builder.control('', Validators.required),
   
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateCategory(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.router.navigate(['/'])
          this.toastr.success('Uploaded successfully');
          this.router.navigate([''])
        });
      } else {
        this.api.CreateCategory(this.companyform.value).subscribe(response => {
         
          this.toastr.success('Saved successfully');
          this.router.navigate(['category'])
        });
      }
    }
  }


  ngOnInit(): void {
    this.LoadCompany();
  }


  Openpopup(id: any) {
    const _popup = this.dialog.open(CategoryPopupComponent, {
      width: '500px',
      exitAnimationDuration: '1000ms',
      enterAnimationDuration: '1000ms',
      data: {
        id: id
      }
    })
    _popup.afterClosed().subscribe(r => {
      this.LoadCompany();
    });
  }

  filterData($event : any){
    this.dataSource.filter = $event.target.value;
}

  LoadCompany() {
    this.api.Getallcategory().subscribe(response => {
      this.prgorammers = response;
    
      this.dataSource = new MatTableDataSource(this.prgorammers); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 

    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    this.api.RemoveCategorybycode(id).subscribe(r => {
      this.toastr.success('Deleted successfully');
        this.LoadCompany();
      });
  }


  onChange($event:any){
    let filterData = _.filter(this.apiResponse,(item)=>{
      console.log(item.isactive)
      return item.isactive.toLowerCase() == $event.value.toLowerCase()
    })
    this.finaldata = new MatTableDataSource(filterData);
  }

  onFullInfoBtnClick(){
    this.router.navigate(['tech-students'])
  }

}
