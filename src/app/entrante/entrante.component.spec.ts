import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntranteComponent } from './entrante.component';

describe('EntranteComponent', () => {
  let component: EntranteComponent;
  let fixture: ComponentFixture<EntranteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntranteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
