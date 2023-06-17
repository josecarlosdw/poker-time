import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Participant } from '../participant.model';

@Component({
  selector: 'app-add-participant-modal',
  templateUrl: './add-participant-modal.component.html',
  styleUrls: ['./add-participant-modal.component.css']
})
export class AddParticipantModalComponent implements OnInit {
  participantForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddParticipantModalComponent>,
  ) {}

  ngOnInit(): void {
    this.participantForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.participantForm.invalid) {
      return;
    }

    const participant: Participant = {
      name: this.participantForm.value.name,
      selectedCard: null,
      id: ''
    };

    this.dialogRef.close(participant);
  }

  onCancelClick() {
    this.dialogRef.close();
  }
}
