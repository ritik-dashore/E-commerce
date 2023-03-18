import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isActive = new BehaviorSubject(false)
  constructor(private http:HttpClient) { }
  sellerGetData(){
    return this.http.get('http://localhost:3000/sellerInfo')
  }
  sellFind(data:any){
    console.log(data.value.email)
    return this.http.get(`http://localhost:3000/sellerInfo?email=${data.value.email}&password=${data.value.password}`)
  }
  userSingUp(data:any){
    return this.http.post('http://localhost:3000/sellerInfo', data)
  }
  deletData(id:any){
    return this.http.delete('http://localhost:3000/sellerInfo/'+id)
  }
}
