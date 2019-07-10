import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor() { }
}

export class StaffModel {
  id: string;
  Name: string;
  Phone: string;
  Address: string;
  Note: string;
}
