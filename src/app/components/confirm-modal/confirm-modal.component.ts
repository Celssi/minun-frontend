import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {
  title = '';
  message = '';
  buttonColor: ThemePalette;

  constructor(private dialogRef: MatDialogRef<ConfirmModalComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.message = data.message;
    this.buttonColor = data.buttonColor;
  }

  ngOnInit(): void {}

  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
