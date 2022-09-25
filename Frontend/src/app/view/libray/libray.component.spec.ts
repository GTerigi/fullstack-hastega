import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrayComponent } from './libray.component';

describe('LibrayComponent', () => {
  let component: LibrayComponent;
  let fixture: ComponentFixture<LibrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LibrayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LibrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
