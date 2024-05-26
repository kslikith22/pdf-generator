import { Component } from '@angular/core';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    UserFormComponent,
    UserListComponent,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './users.component.html',
  styles: ``,
})
export class UsersComponent {
  constructor(private _dialog:MatDialog) {}

  openAddUserComp(){
   this._dialog.open(UserFormComponent);
  }
  closeAddUserComp(){
    this._dialog.closeAll()
  }
}
