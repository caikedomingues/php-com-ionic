import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalclientePage } from './modalcliente.page';

describe('ModalclientePage', () => {
  let component: ModalclientePage;
  let fixture: ComponentFixture<ModalclientePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalclientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
