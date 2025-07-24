import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickShoppingComponent } from './quick-shopping.component';

describe('QuickShoppingComponent', () => {
  let component: QuickShoppingComponent;
  let fixture: ComponentFixture<QuickShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickShoppingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
