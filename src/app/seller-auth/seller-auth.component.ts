import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  loggedUser:any;
  sellerDetails: any;
  sendData: any;
  dbemail: any;
  formEmail: any;
  editId: any;
  editMode: boolean = false;
  @ViewChild('SellerForm') sellerForm!: NgForm;
  sellerLogin(data: any) {
    if (this.editMode) {
      for (let i in this.sellerDetails) {
        if (this.sellerDetails[i].id == this.editId) {
          this._sellerService.updateSeller(this.editId, data.value).subscribe()
          // this.gettingData();
          setTimeout(() => {
            this.gettingData()
          }, 500
          )
        }
        setTimeout(() => {
          this.editMode = false;
          this.sellerForm.reset()
        }, 600)
      }
    } else {
      if (this.signup) {
        this._sellerService.userSingUp(data.value).subscribe((res: any) => {
          this._sellerService.isActive.next(true)
          this.gettingData()
        })
      } else {
        this._sellerService.sellFind(data.value).subscribe(
          (res: any) => {
            for (let key in res) {
              this.dbemail = res[key].email
              this.loggedUser = res[key].name
            }
          }
        )
        this.formEmail = data.value.email
        setTimeout(() => {
          if (this.formEmail == this.dbemail) {
            localStorage.setItem("seller", this.dbemail)
            localStorage.setItem("sellerName", this.loggedUser)
            this.Router.navigate(['home'])
            alert("Succesfully Login")
          } else {
            alert("Login Faield")
          }
        }, 500);
      }
    }
  }
  signup: boolean = false;
  isRegister() {
    this.signup = !this.signup;
  }
  gettingData() {
    this._sellerService.sellerGetData().subscribe((res: any) => { this.sellerDetails = res })
  }
  delet(id: any) {
    this._sellerService.deletData(id).subscribe()
    setTimeout(() => {
      this.gettingData();
    }, 500)
  }
  edit(id: number) {
    this.signup = true;
    this.editMode = true
    this.editId = id;
    for (let i in this.sellerDetails) {
      if (this.sellerDetails[i].id == this.editId) {
        setTimeout(() => {
          this.sellerForm.setValue({
            name: this.sellerDetails[i].name,
            email: this.sellerDetails[i].email,
            password: this.sellerDetails[i].password,
          })
        }, 300)
      }
    }

  }

}
