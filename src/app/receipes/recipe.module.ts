import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReceipesComponent } from './receipes.component';
import { ReceipeListComponent } from './receipe-list/receipe-list.component';
import { ReceipeItemComponent } from './receipe-item/receipe-item.component';
import { ReceipeDetailComponent } from './receipe-detail/receipe-detail.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipesRoutingModule } from './recipes.routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
        ReceipesComponent,
        ReceipeListComponent,
        ReceipeItemComponent,
        ReceipeDetailComponent,
        RecipeStartComponent,
        RecipeEditComponent,
    ],
    imports: [RouterModule, SharedModule, ReactiveFormsModule, RecipesRoutingModule, NgbModule],
})
export class RecipeModule {

}