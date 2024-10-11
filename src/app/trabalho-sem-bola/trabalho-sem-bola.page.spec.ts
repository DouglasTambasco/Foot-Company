import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TrabalhoSemBolaPage } from './trabalho-sem-bola.page';

describe('TrabalhoSemBolaPage', () => {
  let component: TrabalhoSemBolaPage;
  let fixture: ComponentFixture<TrabalhoSemBolaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TrabalhoSemBolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
