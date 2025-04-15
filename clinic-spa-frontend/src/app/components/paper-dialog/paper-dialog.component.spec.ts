import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperDialogComponent } from './paper-dialog.component';

describe('PaperDialogComponent', () => {
  let component: PaperDialogComponent;
  let fixture: ComponentFixture<PaperDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaperDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaperDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
