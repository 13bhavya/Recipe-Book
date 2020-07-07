import { Component, OnInit } from '@angular/core';
import { Recipe } from '../receipe.model';
import { RecipesService } from '../recipes.services';
import { ActivatedRoute, Params, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-receipe-detail',
  templateUrl: './receipe-detail.component.html',
  styleUrls: ['./receipe-detail.component.css']
})
export class ReceipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipesService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddtoShopping() {
    this.recipeService.addIngredienttoShoppingList(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.delRecipe(this.id);
    this.router.navigate(['/recipes']);
    // console.log(this.recipeService.delRecipe(this.id))
    console.log(this.recipe);
  }

  onEdit() {
    
  }

}
