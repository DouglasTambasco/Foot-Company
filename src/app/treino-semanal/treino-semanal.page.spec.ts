import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TreinoSemanalPage } from './treino-semanal.page';

describe('TreinoSemanalPage', () => {
  let component: TreinoSemanalPage;
  let fixture: ComponentFixture<TreinoSemanalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TreinoSemanalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});