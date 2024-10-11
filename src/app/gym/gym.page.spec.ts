import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GymPage } from './gym.page';

describe('GymPage', () => {
  let component: GymPage;
  let fixture: ComponentFixture<GymPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GymPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
