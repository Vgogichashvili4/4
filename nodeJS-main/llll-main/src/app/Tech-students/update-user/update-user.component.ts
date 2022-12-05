import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../shared/api.service';


@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  id:string ="";
  formDefaultData!:any
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,private activatedRoute:ActivatedRoute,
    private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params:Params)=>{
      var id = params["id"];
      this.api.GetCompanybycode(id).subscribe((response:any) =>{
        console.log(response)
        this.formDefaultData = response;
        this.companyform.setValue({
          id: this.formDefaultData.id, gmail: this.formDefaultData.gmail, personalNumber: this.formDefaultData.personalNumber,name: this.formDefaultData.name,
          lastName: this.formDefaultData.lastName,dateOfBirth: this.formDefaultData.dateOfBirth,
          category: this.formDefaultData.category, isactive: this.formDefaultData.isactive
        });
      })
    })
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    gmail: this.builder.control('', Validators.required),
    personalNumber: this.builder.control('', Validators.required),
    name: this.builder.control('', Validators.required),
    lastName: this.builder.control('', Validators.required),
    dateOfBirth: this.builder.control('', Validators.required),
    category: this.builder.control('', Validators.required),
    isactive: this.builder.control(true),
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateComapny(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.router.navigate(['tech-students'])
          this.toastr.success('Updated successfully');
        });
      } else {
        this.api.CreateComapny(this.companyform.value).subscribe(response => {
          this.closepopup();
          this.toastr.success('Added successfully');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }

  onCancelBtnClick(){
    this.router.navigate(["tech-students"])
  }

}
