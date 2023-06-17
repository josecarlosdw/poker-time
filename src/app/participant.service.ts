import { Injectable } from '@angular/core';
import { Participant } from './participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {
  private participants: Participant[] = [];

  constructor() { }

  addParticipant(participant: Participant): void {
    this.participants.push(participant);
  }

  removeParticipant(participantName: string): void {
    this.participants = this.participants.filter(p => p.name !== participantName);
  }

  getParticipantByName(participantName: string): Participant | undefined {
    return this.participants.find(p => p.name === participantName);
  }

  getParticipants(): Participant[] {
    return this.participants;
  }

  getSelectedParticipant(): Participant | undefined {
    return this.participants.find(p => p.selectedCard === null);
  }

  getParticipantsWithCard(card: number): Participant[] {
    return this.participants.filter(p => p.selectedCard === card);
  }

  getSelectedCards(): number[] {
    return this.participants
      .filter(p => p.selectedCard !== null)
      .map(p => p.selectedCard as number);
  }
}
