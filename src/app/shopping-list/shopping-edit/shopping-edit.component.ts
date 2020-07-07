import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingService } from '../shopping.services';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  // @Output() Ingredients = new EventEmitter<{ name: string, amount: number }>();
  @ViewChild('f') form: NgForm;
  subscription: Subscription;
  editMode = false;
  editModeIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscription = this.shoppingService.startEditing
      .subscribe((i: number) => {
        this.editMode = true;
        this.editModeIndex = i;
        this.editedItem = this.shoppingService.getIngredient(i);
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
      })
  }

  onAddItem(getRef: NgForm) {
    const value = getRef.value
    // console.log(getRef)
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.shoppingService.updateIngredient(this.editModeIndex, newIngredient)
    } else {
      this.shoppingService.addIngredient(newIngredient);
      console.log("Else" + newIngredient);
    }
    this.editMode = false;
    getRef.reset();
    // this.Ingredients.emit(newIngredient);
  }

  onClear() {
    this.form.reset();
    this.editMode = false
  }

  onDelete() {
    this.shoppingService.deleteIngredient(this.editModeIndex);
    this.onClear();
  }
}
