import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/shared/api.service';


@Component({
  selector: 'app-category-popup',
  templateUrl: './category-popup.component.html',
  styleUrls: ['./category-popup.component.css']
})
export class CategoryPopupComponent {
  editdata: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,private toastr: ToastrService) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this.api.GetCategorybycode(this.data.id).subscribe(response => {
        this.editdata = response;
        console.log(response)
        this.companyform.setValue({
          id: this.editdata.id, categoryName: this.editdata.categoryName, 
        });
      });
    }
  }

  companyform = this.builder.group({
    id: this.builder.control({ value: '', disabled: true }),
    categoryName: this.builder.control('', Validators.required),
   
  });

  SaveCompany() {
    if (this.companyform.valid) {
      const Editid = this.companyform.getRawValue().id;
      if (Editid != '' && Editid != null) {
        this.api.UpdateCategory(Editid, this.companyform.getRawValue()).subscribe(response => {
          this.closepopup();
          this.toastr.success('Updated successfully');
        });
      } else {
        this.api.CreateCategory(this.companyform.value).subscribe(response => {
          this.closepopup();
          this.toastr.success('Added successfully');
        });
      }
    }
  }

  closepopup() {
    this.dialog.closeAll();
  }
}
