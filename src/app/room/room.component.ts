import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { io, Socket } from 'socket.io-client';
import { ParticipantService } from '../participant.service';
import { MatDialog } from '@angular/material/dialog';
import { MediaModalComponent } from '../media-modal/media-modal.component';
import { AddParticipantModalComponent } from '../add-participant-modal/add-participant-modal.component';
import { v4 as uuidv4 } from 'uuid';



interface Participant {
  id: string;
  selectedCard: number | null;
  name: string;
}


@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent {
  participants: Participant[] = [];
  cards: number[] = [0, 1, 2, 3, 5, 8, 13];
  selectedCard: number | null = null;
  media: number | null = null;
  roomCode: string = '';

  showCreateRoomButton: boolean = true;

  private socket: Socket;

  constructor(
    private participantService: ParticipantService,
    private dialog: MatDialog,
    private route: ActivatedRoute ) {
      
    this.socket = io('http://localhost:3000');

    this.socket.on('vote', (data: { participant: string, vote: number }) => {
      const participant = this.participants.find(p => p.name === data.participant);
      if (participant) {
        participant.selectedCard = data.vote;
      }
    });

    this.socket.on('participantJoined', (participant: Participant) => {
      this.participants.push(participant);
    });

    this.socket.on('participantLeft', (participantName: string) => {
      this.participants = this.participants.filter(p => p.name !== participantName);
    });

    this.roomCode = this.route.snapshot.paramMap.get('roomCode') || '';
  }

  private generateParticipantId(): string {
    return uuidv4(); // Generate a unique ID using UUID version 4
  }

  addName() {
    const dialogRef = this.dialog.open(AddParticipantModalComponent, {
      width: '300px',
    });
  
    dialogRef.afterClosed().subscribe((participant: Participant) => {
      if (participant) {
        participant.id = this.generateParticipantId();
        this.participantService.addParticipant(participant); // Adicionar participante usando o serviço
        this.socket.emit('joinRoom', participant);
        this.socket.emit('participantJoined', participant);
        console.log('participantJoined emitido');
      }
    });
  
    console.log('addName() chamado');
  }

  selectCard(card: number) {
    this.selectedCard = card;
    const selectedParticipant = this.participants.find(p => p.selectedCard === null);
    if (selectedParticipant) {
      selectedParticipant.selectedCard = card;
      this.socket.emit('vote', { participant: selectedParticipant.name, vote: card });
    }
  }

  getParticipantsWithCard(card: number): Participant[] {
    return this.participants.filter(p => p.selectedCard === card);
  }
  openMediaModal(media: number): void {
    const dialogRef = this.dialog.open(MediaModalComponent, {
      data: media,
    });
  }

  calcularMedia() {
    const selectedCards = this.participants.map(p => p.selectedCard).filter(card => card !== null) as number[];
    if (selectedCards.length > 0) {
      const sum = selectedCards.reduce((a, b) => a + b);
      this.media = sum / selectedCards.length;
    } else {
      this.media = null;
    }
    if (this.media !== null) {
      this.openMediaModal(this.media);
    }
  }
}
