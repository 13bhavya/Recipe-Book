import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReceipesComponent } from './receipes.component';
import { AuthGuard } from '../auth/auth.guard';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { RecipeResolverService } from './recipe-resolver.service';

const route: Routes = [
    {
        path: '', component: ReceipesComponent, canActivate: [AuthGuard], children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: ReceipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent },
        ]
    },
]

@NgModule({
    imports: [RouterModule.forChild(route)],
    exports: [RouterModule]
})
export class RecipesRoutingModule {

}