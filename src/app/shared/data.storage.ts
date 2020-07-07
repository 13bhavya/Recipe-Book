import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http'
import { RecipesService } from '../receipes/recipes.services';
import { Recipe } from '../receipes/receipe.model';
import { map, take, exhaustMap, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient,
        private recipeService: RecipesService,
        private authService: AuthService) { };

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        this.http.put('https://ngangular-e23f0.firebaseio.com/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            })
    }

    fetchRecipes() {
        console.log("exhaust")
        return this.http
            .get<Recipe[]>('https://ngangular-e23f0.firebaseio.com/recipes.json?',
        ).pipe(map(recipes => {
            console.log("Recipes from Map", recipes)
            return recipes.map(recipe => {
                console.log("Recipe from 2nd Map :", recipe)
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients : []
                };
            }, console.log("Recipes", recipes));
        }),
            tap(recipes => {
                console.log("Recipes from Subscribe :", recipes)
                this.recipeService.setRecipe(recipes)
            }),
        );
    }
}