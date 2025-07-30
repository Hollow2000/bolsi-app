import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialConfigurationComponent } from './initial-configuration.component';

describe('InitialConfigurationComponent', () => {
  let component: InitialConfigurationComponent;
  let fixture: ComponentFixture<InitialConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InitialConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InitialConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
