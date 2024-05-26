import { Component, Inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { UserCommunicationService } from '../user-communication.service';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<UserFormComponent>,
    private _fb: FormBuilder,
    private _userService: UsersService,
    private userCommunicationService: UserCommunicationService,
    private _coreService:CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      address: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userForm.patchValue(this.data);
  }

  closeAddUserDialog() {
    this._dialogRef.close();
  }

  onFormSubmit() {
    if (this.userForm.valid) {
      if (this.data) {
        this._userService
          .updateUser(this.userForm.value, this.data._id)
          .subscribe({
            next: (val: any) => {
              this.userCommunicationService.notifyUserAdded();
              this._coreService.openSnackBar("User updated successfully","Done!")
            },
            error: (err: any) => {
              console.log(err);
              this._coreService.openSnackBar("Failed to update user","Done!")
            },
          });
      } else {
        this._userService.addUser(this.userForm.value).subscribe({
          next: (val: any) => {
            this.userCommunicationService.notifyUserAdded();
            this._coreService.openSnackBar("User added successfully","Done!")
          },
          error: (err: any) => {
            console.log(err);
            this._coreService.openSnackBar("Failed to add user","Done!")
          },
        });
      }
      this.closeAddUserDialog();
    } else {
      console.log('Value not valid');
    }
  }
}
