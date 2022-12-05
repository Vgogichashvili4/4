import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { companymodel } from 'src/app/Model/companymodel';
import * as _ from 'lodash'


@Component({
  selector: 'app-tech-students-list',
  templateUrl: './tech-students-list.component.html',
  styleUrls: ['./tech-students-list.component.css']
})
export class TechStudentsListComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) matSort!:MatSort
  companydata!: companymodel[];
  finaldata:any;
  prgorammers:any[] = []
  tech:any[] = []
  categories:any[] = []

  constructor(private api: ApiService,private toastr: ToastrService,private router:Router) { }


  ngOnInit(): void {
    this.LoadCompany();
    this.getCategories();
  }

  displayedColumns?: string[] = ["id", "gmail", "personalNumber", "name", "lastName", 'dateOfBirth', 'category', "isactive", "action"]
  dataSource!:MatTableDataSource<any>;


  filterData($event : any){
    this.dataSource.filter = $event.target.value;
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
      this.dataSource = new MatTableDataSource(this.prgorammers); 
      this.dataSource.paginator = this.paginator; 
      this.dataSource.sort = this.matSort; 
    }); 
  }     
  
  getCategories(){
    this.api.Getallcategory().subscribe((res:any)=>{
      console.log("res",res)
      this.categories = res
      console.log(this.categories)
      
    })
    
  }


  RemoveCompany(id: any) {
    this.api.RemoveCompanybycode(id).subscribe(r => {
      this.toastr.success('Deleted successfully');
        this.LoadCompany();
      });
  }

    createBtnClick(){
      this.router.navigate(['add-user'])
    }

    onChange($event:any){
      let filteredData = _.filter(this.prgorammers,(item)=>{
        return item.category.toLowerCase() == $event.value.toLowerCase()
      })
      this.dataSource = new MatTableDataSource(filteredData)
    }

    clearValue(){
      this.dataSource = new MatTableDataSource(this.prgorammers)
    }
}
