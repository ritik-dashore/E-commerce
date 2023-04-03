import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SellerService } from '../service/seller.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menutype:string = "default";
  constructor(private Router:Router, private _sellerService:SellerService) { }
  loggedUserName:any;
  ngOnInit(): void {
    this.Router.events.subscribe((res:any)=>{
      if(res.url){
        this.loggedUserName = localStorage.getItem("sellerName")
        if(localStorage.getItem("seller") && res.url.includes("seller")){
          this.menutype = "seller"
        }else{
          this.menutype = "default"
        }
      }
    })
  }
  logout(){
    localStorage.removeItem("seller")
    this.Router.navigate(['seller-auth'])
    this.menutype = "default"
  }
}
