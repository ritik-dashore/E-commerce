import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs';
import { Signup } from '../data-type';


@Injectable({
  providedIn: 'root'
})
export class SellerService {
  isActive = new BehaviorSubject(false)
  constructor(private http:HttpClient) { }
  sellerGetData(){
    return this.http.get('http://localhost:3000/sellerInfo')
  }
  sellFind(data:Signup){
    return this.http.get(`http://localhost:3000/sellerInfo?email=${data.email}&password=${data.password}`)
  }
  userSingUp(data:Signup){
    return this.http.post('http://localhost:3000/sellerInfo', data)
  }
  updateSeller(id:number, data:Signup,){
    return this.http.put('http://localhost:3000/sellerInfo/'+id, data)
  }
  deletData(id:any){
    return this.http.delete('http://localhost:3000/sellerInfo/'+id)
  }
}
