import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteOptgroupComponent } from './autocomplete-optgroup.component';

describe('AutocompleteOptgroupComponent', () => {
  let component: AutocompleteOptgroupComponent;
  let fixture: ComponentFixture<AutocompleteOptgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteOptgroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteOptgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
