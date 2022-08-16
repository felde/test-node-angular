import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAccessComponent } from './template.component';

describe('TemplateAccessComponent', () => {
  let component: TemplateAccessComponent;
  let fixture: ComponentFixture<TemplateAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplateAccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateAccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
