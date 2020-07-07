import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingService } from './shopping.services';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];
  private changedSubs: Subscription;

  constructor(private shoppingService: ShoppingService,
              private loggingService: LoggingService) { }

  ngOnInit(): void {
    this.ingredients = this.shoppingService.getIngredients();
    this.changedSubs = this.shoppingService.ingredientsChanged.
      subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        console.log(ingredients)
      })
    this.loggingService.printLog('Hello from Shopping component NgonInit');
  }

  ngOnDestroy() {
    this.changedSubs.unsubscribe();
  }

  onEdit(index: number) {
    this.shoppingService.startEditing.next(index);
  }

  // ingredientAdded(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   console.log(ingredient);
  // }

}
