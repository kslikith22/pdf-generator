// generate-pdf-button.component.ts
import { Component, Input } from '@angular/core';
import { CoreService } from '../../core/core.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-generate-pdf-button',
  standalone: true,
  template: `
    <h1
      (click)="generatePdf()"
      class="text-blue-600 font-medium hover:underline cursor-pointer"
    >
      Generate
    </h1>
  `,
})
export class GeneratePdfButtonComponent {
  @Input() id: string = '';

  constructor(
    private _userService: UsersService,
    private _coreService: CoreService
  ) {}

  generatePdf() {
    this._userService.generatePdf(this.id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `user_${this.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._coreService.openSnackBar(
          'Pdf file generated for id ' + this.id,
          'Done!'
        );
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}
