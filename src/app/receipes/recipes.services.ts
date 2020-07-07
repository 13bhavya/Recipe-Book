import { Recipe } from './receipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../shopping-list/shopping.services';
import { Subject } from 'rxjs';

@Injectable()
export class RecipesService {
    recipeSelected = new Subject<Recipe[]>();

    private recipeItems: Recipe[] = [];
    // [
    //     new Recipe('A Test Recipe', 'This is a simple test', 'https://c.ndtvimg.com/2019-11/s5i8nm3g_manchurian_625x300_26_November_19.jpg',
    //         [
    //             new Ingredient('Meat', 1),
    //             new Ingredient('Frenchfries', 20)

    //         ]),
    //     new Recipe('A Flavour Recipe', 'This is a simple test', 'https://c.ndtvimg.com/2019-11/s5i8nm3g_manchurian_625x300_26_November_19.jpg',
    //         [
    //             new Ingredient('Bun', 1),
    //             new Ingredient('Frenchfries', 20)
    //         ]),
    // ];

    constructor(private shoppingservice: ShoppingService) {

    }

    setRecipe(recipes: Recipe[]) {
        this.recipeItems = recipes;
        console.log("recipe Items: " + this.recipeItems.slice())
        this.recipeSelected.next(this.recipeItems.slice())
    }
    getRecipes() {
        return this.recipeItems.slice();
    }

    getRecipe(index: number) {
        return this.recipeItems[index];
    }

    delRecipe(i: number) {
        console.log(i)
        this.recipeItems.splice(i, 1);
        this.recipeSelected.next(this.recipeItems.slice())
    }

    addIngredienttoShoppingList(ingredient: Ingredient[]) {
        this.shoppingservice.addIngredients(ingredient);
    }

    addRecipe(recipe: Recipe) {
        this.recipeItems.push(recipe);
        this.recipeSelected.next(this.recipeItems.slice())
    }

    updateRecipe(index: number, recipe: Recipe) {
        this.recipeItems[index] = recipe
        this.recipeSelected.next(this.recipeItems.slice())
    }
}