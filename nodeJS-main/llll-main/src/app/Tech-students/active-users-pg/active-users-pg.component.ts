import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { companymodel } from '../../Model/companymodel';
import { PopupComponent } from '../../popup/popup.component';
import { ApiService } from '../../shared/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as _ from 'lodash';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';




@Component({
  selector: 'app-active-users-pg',
  templateUrl: './active-users-pg.component.html',
  styleUrls: ['./active-users-pg.component.css']
})
export class ActiveUsersPgComponent implements OnInit {

  constructor(private dialog: MatDialog, private api: ApiService,private router:Router,private toastr: ToastrService,) { }
  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  companydata!: companymodel[];
  finaldata:any;
  prgorammers:any[] = []
  tech:any[] = []
  apiResponse:any


  ngOnInit(): void {
    this.LoadCompany();
  }

  displayedColums: string[] = ["id", "name", "isactive", "action"]
  dataSource!:MatTableDataSource<any>;
  Openpopup(id: any) {
    const _popup = this.dialog.open(PopupComponent, {
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
    this.finaldata.filter = $event.target.value;
}

  LoadCompany() {
    this.api.Getallcomapny().subscribe(response => {
      this.prgorammers = response;
      console.log(this.prgorammers)
      for(let i =0; i<this.prgorammers.length;i++){
        if(this.prgorammers[i].category == "Information Technology"){
            this.tech.push(this.prgorammers[i])
        }
      }
      this.companydata = this.tech;
      this.dataSource = new MatTableDataSource(this.companydata); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 

    });
  }

  EditCompany(id: any) {
    this.Openpopup(id);
  }
  RemoveCompany(id: any) {
    this.api.RemoveCompanybycode(id).subscribe(r => {
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

