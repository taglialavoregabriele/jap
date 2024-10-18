import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { EditDecksModule } from "./edit-decks/edit-decks.module";
import { GameModule } from "./game/game.module";
import { AppRoutingModule } from "./app.routing.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    GameModule,
    EditDecksModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
