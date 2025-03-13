import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JishoComponent } from './jisho.component';

describe('JishoComponent', () => {
  let component: JishoComponent;
  let fixture: ComponentFixture<JishoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JishoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JishoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
