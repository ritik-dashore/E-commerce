import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { AdminGuard } from './seller-auth/admin.guard';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';

const routes: Routes = [
  {path:'home', component:HomeComponent, canActivate:[AuthGuard]},
  {path:'seller-auth', component:SellerAuthComponent, canDeactivate:[AdminGuard]},
  {path:'seller-add-product', component:SellerAddProductComponent, canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
