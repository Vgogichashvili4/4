import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { companymodel } from '../Model/companymodel';
import { categoryModel } from '../Model/category.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/company';
  apiurl2 = 'http://localhost:3000/category';
 

  Getallcomapny(): Observable<companymodel[]> {
    return this.http.get<companymodel[]>(this.apiurl);
  }

  GetCompanybycode(id: any): Observable<companymodel> {
    return this.http.get<companymodel>(this.apiurl + '/' + id);
  }


  RemoveCompanybycode(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CreateComapny(companydata: any) {
    return this.http.post(this.apiurl, companydata);
  }

 
  UpdateComapny(id: any, companydata: any) {
    return this.http.put(this.apiurl + '/' + id, companydata);
  }

  Getallcategory(): Observable<categoryModel[]> {
    return this.http.get<categoryModel[]>(this.apiurl2);
  }

  GetCategorybycode(id: any): Observable<categoryModel> {
    return this.http.get<categoryModel>(this.apiurl2 + '/' + id);
  }

  CreateCategory(companydata:any){
    return this.http.post(this.apiurl2,companydata);
  }

  RemoveCategorybycode(id: any) {
    return this.http.delete(this.apiurl2 + '/' + id);
  }

  UpdateCategory(id: any, companydata: any) {
    return this.http.put(this.apiurl2 + '/' + id, companydata);
  }

}
