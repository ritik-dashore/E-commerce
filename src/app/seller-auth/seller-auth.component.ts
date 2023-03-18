import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../service/seller.service';
@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {

  constructor(private _sellerService: SellerService, private Router: Router) { }
  localData: any;
  ngOnInit(): void {
    this.gettingData()
    this.localData = localStorage.getItem("seller")
  }
  sellerDetails: any;
  sendData: any;
  dbemail: any;
  formEmail: any;
  sellerLogin(data: any) {
    if (this.signup) {
      console.log(data.value)
      this._sellerService.userSingUp(data.value).subscribe((res: any) => {
        console.log(res),
          this._sellerService.isActive.next(true)
      })
    } else {
      this._sellerService.sellFind(data).subscribe(
        (res: any) => {
          for (let key in res) {
            this.dbemail = res[key].email
          }
        }
      )
    }
    this.formEmail = data.value.email
    setTimeout(() => {
      if (this.formEmail == this.dbemail) {
        localStorage.setItem("seller", this.dbemail)
        this.Router.navigate(['home'])
      alert("Succesfully Login")

      }else{
        alert("Login Faield")
      }
    }, 500);
  }
  signup: boolean = false;
  isRegister() {
    this.signup = !this.signup;
  }
  gettingData() {
    this._sellerService.sellerGetData().subscribe((res: any) => { this.sellerDetails = res })
  }
  delet(id: any) {
    console.log(id)
    this._sellerService.deletData(id).subscribe(res => console.log(res))
  }

   
}
