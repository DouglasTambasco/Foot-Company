import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdicionarJogoPage } from './adicionar-jogo.page';

describe('AdicionarJogoPage', () => {
  let component: AdicionarJogoPage;
  let fixture: ComponentFixture<AdicionarJogoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AdicionarJogoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
