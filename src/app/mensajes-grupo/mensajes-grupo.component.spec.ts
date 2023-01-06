import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajesGrupoComponent } from './mensajes-grupo.component';

describe('MensajesGrupoComponent', () => {
  let component: MensajesGrupoComponent;
  let fixture: ComponentFixture<MensajesGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajesGrupoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajesGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
