import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from './receipe.model';
import { DataStorageService } from '../shared/data.storage';
import { RecipesService } from './recipes.services';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
    constructor(private dataStorage: DataStorageService, private recipeService: RecipesService) { }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes = this.recipeService.getRecipes();

        if (recipes.length === 0) {
            return this.dataStorage.fetchRecipes();
        } else {
            return recipes;
        }

    }
}