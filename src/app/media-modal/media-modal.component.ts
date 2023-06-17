import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-media-modal',
  template: `
    <h2 mat-dialog-title>Média dos Valores</h2>
    <mat-dialog-content>
      A média dos valores é: {{ media }}
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Fechar</button>
    </mat-dialog-actions>
  `,
})
export class MediaModalComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public media: number) {}
}
