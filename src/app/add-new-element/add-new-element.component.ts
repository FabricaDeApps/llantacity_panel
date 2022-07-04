import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ModalCreate } from '../clases/interfaces';

@Component({
  selector: 'app-add-new-element',
  templateUrl: './add-new-element.component.html',
  styleUrls: ['./add-new-element.component.css']
})
export class AddNewElementComponent implements OnInit {
  subtitle: string;
  message: string;
  buttonAccept: string
  buttonCancell: string
  spanAcept: string
  spanCancell: string
  textTooltip: string

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalCreate) {
    this.subtitle = data.subtitle;
    this.message = data.message;
    this.buttonAccept = data.buttonAccept;
    this.spanAcept = data.spanAcept;
    this.buttonCancell = data.buttonCancell;
    this.spanCancell = data.spanCancell;
    this.textTooltip = data.textTooltip;
  }


  ngOnInit() {
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}
