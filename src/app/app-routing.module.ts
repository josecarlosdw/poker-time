import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomComponent } from './room/room.component';


const routes: Routes = [
  { path: 'room', component: RoomComponent },
  { path: 'room/:roomCode', component: RoomComponent },
  { path: 'room/participants/:participants', component: RoomComponent },  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
