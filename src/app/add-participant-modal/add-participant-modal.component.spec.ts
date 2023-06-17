import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddParticipantModalComponent } from './add-participant-modal.component';

describe('AddParticipantModalComponent', () => {
  let component: AddParticipantModalComponent;
  let fixture: ComponentFixture<AddParticipantModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddParticipantModalComponent]
    });
    fixture = TestBed.createComponent(AddParticipantModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
