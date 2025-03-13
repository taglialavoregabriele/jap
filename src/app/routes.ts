import { Routes } from "@angular/router";
import { MatchPairsGameComponent } from "./game/matchPairs/match-pairs.component";
import { SettingsComponent } from "./settings/settings.component";
import { EditMatchPairDecksComponent } from "./edit-decks/matchPairs/match-pairs.component";
import { EditWordTypeDeckComponent } from "./edit-decks/word-type/word-type.component";
import { WordTypeGameComponent } from "./game/word-type/word-type.component";
import { AppComponent } from "./app.component";
import { JishoComponent } from "./jisho/jisho.component";
import { SentencesComponent } from "./game/sentences/sentences.component";

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'game',
        children: [
          {
            path: 'matchpairs',
            component: MatchPairsGameComponent
          },
          {
            path: 'wordtype',
            component: WordTypeGameComponent
          },
          {
            path: 'sentences',
            component: SentencesComponent
          }

        ]
      },
      {
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'jisho',
        component: JishoComponent
      },
      {
        path: 'editdecks',
        children: [
          {
            path: 'matchpairs',
            component: EditMatchPairDecksComponent
          },
          {
            path: 'wordtype',
            component: EditWordTypeDeckComponent
          }
        ]
      }
    ]
    ,
  },
];
