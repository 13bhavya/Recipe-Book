import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../receipe.model';

@Component({
  selector: 'app-receipe-item',
  templateUrl: './receipe-item.component.html',
  styleUrls: ['./receipe-item.component.css']
})
export class ReceipeItemComponent implements OnInit {
  // rec: Recipe;
  @Input() recipe: Recipe;
  // @Output() recipeSelected = new EventEmitter<void>();
  @Input() index: number;
  ngOnInit(): void {

  }

  // onSelected() {
  //   this.recipeService.recipeSelected.emit(this.recipe);
    // this.recipeSelected.emit();
    // console.log("Recipe Item " + this.recipe);
  // }

}
