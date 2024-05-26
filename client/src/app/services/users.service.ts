import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private _http:HttpClient) { }

  addUser(data: any) : Observable<any>{
    return this._http.post('http://localhost:3000/users',data)
  } 
  getAllUsers() : Observable<any>{
    return this._http.get('http://localhost:3000/users')
  }
  deleteUser(id:string) : Observable<any>{
    return this._http.delete(`http://localhost:3000/users/${id}`)
  }
  generatePdf(id: string) : Observable<any>{
    return this._http.get(`http://localhost:3000/pdf/${id}`,{responseType : 'blob'})
  }
  updateUser(data:any,id:string):Observable<any>{
    return this._http.patch(`http://localhost:3000/users/${id}`,data)
  }
}
