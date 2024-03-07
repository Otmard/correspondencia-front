import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LadingpageComponent } from './ladingpage.component';

describe('LadingpageComponent', () => {
  let component: LadingpageComponent;
  let fixture: ComponentFixture<LadingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LadingpageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LadingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
