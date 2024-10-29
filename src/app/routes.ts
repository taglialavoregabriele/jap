import { Routes } from "@angular/router";
import { EditDecksComponent } from "./edit-decks/edit-decks.component";
import { MatchPairsComponent } from "./game/matchPairs/match-pairs.component";
import { SettingsComponent } from "./settings/settings.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'game',
        children: [
          {
            path: 'matchpairs',
            component: MatchPairsComponent
          }

        ]
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
