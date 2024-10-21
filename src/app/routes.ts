import { Routes } from "@angular/router";
import { EditDecksComponent } from "./edit-decks/edit-decks.component";
import { GameComponent } from "./game/game.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'game',
        component: GameComponent
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'editDecks',
        component: EditDecksComponent
      }
    ]
  },
];
