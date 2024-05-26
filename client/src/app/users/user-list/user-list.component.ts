import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { UserCommunicationService } from '../user-communication.service';
import { MatIconModule } from '@angular/material/icon';
import { UserFormComponent } from '../user-form/user-form.component';
import { MatDialog } from '@angular/material/dialog';
import { CoreService } from '../../core/core.service';
import { GeneratePdfButtonComponent } from '../generate-pdf-button/generate-pdf-button.component';
import { ViewPdfButtonComponent } from '../view-pdf-button/view-pdf-button.component';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [MatTableModule, MatIconModule,GeneratePdfButtonComponent,ViewPdfButtonComponent],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit {
  constructor(
    private _userService: UsersService,
    private _userCommunicationService: UserCommunicationService,
    private _dialog: MatDialog,
    private _coreService:CoreService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
    this._userCommunicationService.userAdded.subscribe(() => {
      this.getAllUsers();
    });
  }

  displayedColumns: string[] = [
    'name',
    'email',
    'phone',
    'address',
    'actions',
    'pdf',
    'view pdf'
  ];
  dataSource = new MatTableDataSource<any>();

  getAllUsers() {
    this._userService.getAllUsers().subscribe({
      next: (res: any) => {
        console.log(res.data);
        this.dataSource.data = res.data;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  deleteUserById(id: string) {
    this._userService.deleteUser(id).subscribe({
      next: (res: any) => {
        this._coreService.openSnackBar("User deleted","Done!")
        this.getAllUsers();
      },
      error: (err: any) => {
        this._coreService.openSnackBar("Failed to delete user","Done!")
        console.log(err);
      },
    });
  }

  generatePdfById(id: string) {
    this._userService.generatePdf(id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `user_${id}.pdf`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        this._coreService.openSnackBar("Pdf file generated for id "+id,"Done!")
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  viewPdfById(id: string) {
    this._userService.generatePdf(id).subscribe({
      next: (res: Blob) => {
        const url = window.URL.createObjectURL(res);
        window.open(url); // Open PDF in a new tab
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }

  openEditForm(data: any) {
    this._dialog.open(UserFormComponent, { data });
  }

  onUserAdded() {
    this.getAllUsers();
  }
}
