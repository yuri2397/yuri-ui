import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YuriUiComponent } from './yuri-ui.component';

describe('YuriUiComponent', () => {
  let component: YuriUiComponent;
  let fixture: ComponentFixture<YuriUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YuriUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(YuriUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
