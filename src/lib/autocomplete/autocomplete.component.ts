import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, signal, computed, inject, ContentChildren, QueryList, AfterContentInit, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'yuri-autocomplete',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements AfterContentInit {
  @Input() placeholder: string = 'Search';
  @Input() clearable: boolean = true;
  @Input() displayFooter: boolean = true;
  @Input() data: any[] = [];
  @Input() displayField: string = 'name';
  @Input() valueField: string = 'id';
  @Input() groupField: string = 'group';
  @Input() minChars: number = 1;
  @Input() maxResults: number = 10;
  @Input() customItemTemplate: TemplateRef<any> | null = null;
  @Input() customGroupTemplate: TemplateRef<any> | null = null;
  @Input() customNoResultsTemplate: TemplateRef<any> | null = null;

  @Output() search = new EventEmitter<string>();
  @Output() select = new EventEmitter<any>();
  @Output() clear = new EventEmitter<void>();

  @ViewChild('inputElement') inputElement!: ElementRef<HTMLInputElement>;

  searchText = signal('');
  showDropdown = signal(false);
  selectedIndex = signal(-1);

  // Signal pour indiquer si des composants d'option personnalisés sont présents
  hasCustomOptions = signal(false);

  filteredItems = computed(() => {
    if (!this.data || this.data.length === 0 || this.searchText().length < this.minChars) {
      return [];
    }

    const searchLower = this.searchText().toLowerCase();
    return this.data
      .filter(item => {
        const displayValue = this.getDisplayValue(item);
        return displayValue.toLowerCase().includes(searchLower);
      })
      .slice(0, this.maxResults);
  });

  groupedItems = computed(() => {
    const groups = new Map<string, any[]>();

    this.filteredItems().forEach(item => {
      const group = this.getGroupValue(item);
      if (!groups.has(group)) {
        groups.set(group, []);
      }
      groups.get(group)?.push(item);
    });

    return groups;
  });

  onInputChange(event: any): void {
    this.searchText.set(event.target.value);
    this.search.emit(this.searchText());

    if (this.searchText().length >= this.minChars) {
      this.showDropdown.set(true);
    } else {
      this.showDropdown.set(false);
    }
  }

  getDisplayValue(item: any): string {
    if (typeof item === 'string') {
      return item;
    }
    return item[this.displayField] || '';
  }

  getGroupValue(item: any): string {
    if (typeof item === 'string') {
      return 'Items';
    }
    return item[this.groupField] || 'Items';
  }

  selectItem(item: any): void {
    this.searchText.set(this.getDisplayValue(item));
    this.showDropdown.set(false);
    this.select.emit(item);
  }

  clearSearch(): void {
    this.searchText.set('');
    this.showDropdown.set(false);
    this.clear.emit();
    this.inputElement.nativeElement.focus();
  }

  onKeyDown(event: KeyboardEvent): void {
    const items = this.filteredItems();

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.selectedIndex.update(val => {
          let newVal = val + 1;
          if (newVal >= items.length) {
            newVal = 0;
          }
          return newVal;
        });
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.selectedIndex.update(val => {
          let newVal = val - 1;
          if (newVal < 0) {
            newVal = items.length - 1;
          }
          return newVal;
        });
        break;

      case 'Enter':
        event.preventDefault();
        const currentIndex = this.selectedIndex();
        if (currentIndex >= 0 && currentIndex < items.length) {
          this.selectItem(items[currentIndex]);
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.showDropdown.set(false);
        break;
    }
  }

  onFocus(): void {
    if (this.searchText().length >= this.minChars) {
      this.showDropdown.set(true);
    }
  }

  onBlur(): void {
    // Delayed hiding to allow item selection by click
    setTimeout(() => {
      this.showDropdown.set(false);
    }, 200);
  }

  highlightText(text: string, highlight: string): string {
    if (!highlight || highlight === '') {
      return text;
    }

    const pattern = highlight.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    const regex = new RegExp(`(${pattern})`, 'gi');

    return text.replace(regex, '<span class="highlight">$1</span>');
  }

  ngAfterContentInit(): void {
    // Cette méthode sera utilisée plus tard pour la détection des composants personnalisés
  }
}
