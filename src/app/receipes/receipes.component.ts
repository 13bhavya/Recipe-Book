import { Component, OnInit } from '@angular/core';
import { Recipe } from './receipe.model';
import { RecipesService } from './recipes.services';

@Component({
  selector: 'app-receipes',
  templateUrl: './receipes.component.html',
  styleUrls: ['./receipes.component.css']
})
export class ReceipesComponent implements OnInit {
  selectedRecipe: Recipe;

  // constructor(private recipeService: RecipesService) { }

  ngOnInit(): void {
    // this.recipeService.recipeSelected.subscribe( 
    //   (recipe: Recipe) => {
    //     this.selectedRecipe = recipe;
    // })
  }

  // ClickonRecipe(Recipe) {
  //   this.selectedRecipe = Recipe
  // }

}
