import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { ParticipantService } from './participant.service';
import { v4 as uuidv4 } from 'uuid';
import { ButtonVisibilityService } from './buttonvisibility.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'planning-poker-app';
  roomCode: string = '';
  

  constructor(
    private router: Router,
    private participantService: ParticipantService,
    public buttonVisibilityService: ButtonVisibilityService
    ) { 
     
    }

    ngOnInit() {
      this.buttonVisibilityService.showCreateRoomButton = true;
    }

   
    createRoom() {
      const participants = this.participantService.getParticipants();
      const roomCode = uuidv4(); // Gerar um código único usando UUID
      const roomLink = `/room/${roomCode}`;
      console.log('Link da sala:', roomLink);
      this.router.navigateByUrl(roomLink);
      this.buttonVisibilityService.showCreateRoomButton = false;
    }

    navigateToHome() {
  
      this.router.navigate(['/']);
      
    }
}
