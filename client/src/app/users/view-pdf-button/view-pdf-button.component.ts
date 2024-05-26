import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-view-pdf-button',
  standalone:true,
  template: `
    <button class="text-gray-500 hover:underline font-semibold" (click)="viewPdf()">
    view
    </button>
  `,
})
export class ViewPdfButtonComponent {
  @Input() id: string='';
  
  constructor(
    private _userService: UsersService,
    private _snackBar: MatSnackBar
  ) {}

  viewPdf() {
    console.log("View")
    this._userService.generatePdf(this.id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        window.open(url);
      },
      error: (err: any) => {
        console.log(err);
        this._snackBar.open("Error generating PDF", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      },
    });
  }
}
