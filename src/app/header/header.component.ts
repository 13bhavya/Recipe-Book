import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data.storage';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private userSub: Subscription;
  collapsed = true;
  isAuthenticated = false;

  constructor(private data: DataStorageService,
    private authService: AuthService) { }

  onSave() {
    this.data.storeRecipes();
  }
  onFetch() {
    this.data.fetchRecipes().subscribe();
  }

  ngOnInit() {
    this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(!user, !!user);
      }
    )
  }

  onLogout() {
    this.authService.logOut();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
  // @Output() recipeCreated = new EventEmitter<string>();
  // @Output() shoppingCreated = new EventEmitter<string>();

  // onRecipeClick(rec: string) {
  //     this.recipeCreated.emit(rec)
  //     console.log("Recipe clicked and emitted : " + rec)
  // }

  // onShoppingClick(shop: string) {
  //     this.shoppingCreated.emit(shop)
  //     console.log("Shopping clicked and emitted : " + shop)

  //     // this.shoppingCreated.emit(true)
  //     // console.log(this.recipee)

  // }
}
