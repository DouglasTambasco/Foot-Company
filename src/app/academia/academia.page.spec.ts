import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcademiaPage } from './academia.page';

describe('AcademiaPage', () => {
  let component: AcademiaPage;
  let fixture: ComponentFixture<AcademiaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcademiaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
