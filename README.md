# Yuri UI Components

Une bibliothèque de composants Angular personnalisables et faciles à utiliser pour vos applications web modernes.

## Installation

```bash
npm install yuri-ui --save
```

## Composants disponibles

### Autocomplete

Un composant d'autocomplétion flexible et personnalisable avec support pour le regroupement et les templates personnalisés.

<a href="https://ibb.co/4ZdmBpVx"><img src="https://i.ibb.co/WWtxSf21/Capture-d-e-cran-2025-04-16-a-14-42-44.png" alt="Capture-d-e-cran-2025-04-16-a-14-42-44" border="0"></a>
<a href="https://ibb.co/jKDQ144"><img src="https://i.ibb.co/NhKJHYY/Capture-d-e-cran-2025-04-16-a-14-43-15.png" alt="Capture-d-e-cran-2025-04-16-a-14-43-15" border="0"></a>


#### Fonctionnalités

- Recherche en temps réel
- Regroupement des résultats
- Templates personnalisables pour les éléments, groupes et messages "aucun résultat"
- Navigation au clavier
- Mise en surbrillance des termes recherchés
- Support pour le nettoyage de la recherche

## Utilisation

### Autocomplete - Utilisation basique

```typescript
import { Component } from '@angular/core';
import { AutocompleteComponent } from 'yuri-ui';

@Component({
  selector: 'app-demo',
  standalone: true,
  imports: [AutocompleteComponent],
  template: `
    <yuri-autocomplete
      [data]="items"
      placeholder="Rechercher..."
      (select)="onItemSelect($event)"
    ></yuri-autocomplete>
  `
})
export class DemoComponent {
  items = [
    { id: 1, name: 'Campaign Name Fintory', group: 'Campaigns' },
    { id: 2, name: 'Fintory Campaign Name', group: 'Campaigns' },
    { id: 3, name: 'Product Name Fintory', group: 'Products' },
    { id: 4, name: 'Fintory Product Name', group: 'Products' }
  ];

  onItemSelect(item: any) {
    console.log('Item sélectionné:', item);
  }
}
```

### Autocomplete - Avec templates personnalisés

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from 'yuri-ui';

@Component({
  selector: 'app-custom-demo',
  standalone: true,
  imports: [CommonModule, AutocompleteComponent],
  template: `
    <yuri-autocomplete
      [data]="items"
      [customItemTemplate]="customItem"
      [customGroupTemplate]="customGroup"
      [customNoResultsTemplate]="noResults"
      (select)="onItemSelect($event)"
    ></yuri-autocomplete>

    <!-- Template pour les éléments -->
    <ng-template #customItem let-item let-searchText="searchText">
      <div style="display: flex; align-items: center;">
        <div *ngIf="item.group === 'Campaigns'" style="margin-right: 12px; color: #6366F1;">
          <!-- Icône de campagne ici -->
        </div>
        <div>
          <div [innerHTML]="highlightText(item.name, searchText)"></div>
          <div style="font-size: 12px; color: #6B7280;">ID: {{ item.id }}</div>
        </div>
      </div>
    </ng-template>

    <!-- Autres templates... -->
  `
})
export class CustomDemoComponent {
  // ...
}
```

## Options de configuration

### Autocomplete Component

| Propriété | Type | Description | Valeur par défaut |
|-----------|------|-------------|------------------|
| `data` | `any[]` | Les données à afficher dans la liste déroulante | `[]` |
| `displayField` | `string` | Le champ à utiliser pour afficher le texte | `'name'` |
| `valueField` | `string` | Le champ à utiliser comme valeur | `'id'` |
| `groupField` | `string` | Le champ à utiliser pour le regroupement | `'group'` |
| `minChars` | `number` | Nombre minimum de caractères pour déclencher la recherche | `1` |
| `maxResults` | `number` | Nombre maximum de résultats à afficher | `10` |
| `clearable` | `boolean` | Afficher ou non le bouton d'effacement | `true` |
| `placeholder` | `string` | Texte d'instruction dans le champ de recherche | `'Search'` |
| `customItemTemplate` | `TemplateRef` | Template personnalisé pour les éléments | `null` |
| `customGroupTemplate` | `TemplateRef` | Template personnalisé pour les en-têtes de groupe | `null` |
| `customNoResultsTemplate` | `TemplateRef` | Template personnalisé pour le message "aucun résultat" | `null` |

### Événements

| Événement | Description | Paramètres |
|-----------|-------------|------------|
| `select` | Déclenché lorsqu'un élément est sélectionné | L'élément sélectionné |
| `search` | Déclenché lorsque le texte de recherche change | Le texte de recherche |
| `clear` | Déclenché lorsque la recherche est effacée | Aucun |

## Développement

### Cloner le projet

```bash
git clone https://github.com/votre-username/yuri-ui.git
cd yuri-ui
npm install
```

### Construire la bibliothèque

```bash
ng build yuri-ui
```

### Démarrer l'application de démonstration

```bash
ng serve demo-app
```

## Contribution

Les contributions sont les bienvenues ! N'hésitez pas à soumettre des pull requests, à signaler des bugs ou à proposer de nouvelles fonctionnalités.

## Licence

MIT# yuri-ui
# yuri-ui
