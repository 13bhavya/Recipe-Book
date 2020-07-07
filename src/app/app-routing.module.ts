import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from './error-page/error-page.component';


const routes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  {
    path: 'recipes', loadChildren: () => import('./receipes/recipe.module').then(m => m.RecipeModule)
  },
  {
    path: 'shoppingList', loadChildren: () => import('./shopping-list/shopping.module').then(m => m.ShoppingModule)
  },
  {
    path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  { path: 'error-page', component: ErrorPageComponent },
  { path: '**', redirectTo: 'error-page' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
