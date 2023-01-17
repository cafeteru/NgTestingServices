import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PicoPreviewComponent } from './components/pico-preview/pico-preview.component';
import { ProductsComponent } from './components/products/products.component';

const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'pico-preview', component: PicoPreviewComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
