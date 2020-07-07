import { Component, OnInit } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipesService } from '../recipes.services';


@Component({
  selector: 'app-receipe-list',
  templateUrl: './receipe-list.component.html',
  styleUrls: ['./receipe-list.component.css']
})
export class ReceipeListComponent implements OnInit {
  // @Output() wasRecipeSelected = new EventEmitter<Recipe>();
  recipeItems: Recipe[];

  constructor(private recipeServices: RecipesService) { }

  ngOnInit() {
    this.recipeServices.recipeSelected
      .subscribe(
        (recipe: Recipe[]) => {
          console.log('Recipe :' + recipe)
          this.recipeItems = recipe;
        })
    this.recipeItems = this.recipeServices.getRecipes();
    console.log("List Component :" + this.recipeItems)
  }

  // onListenItem(recipe: Recipe) {
  //   this.wasRecipeSelected.emit(recipe);
  //   console.log("Recipe list " + recipe);
  // }

}
