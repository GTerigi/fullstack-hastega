import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../interface/User";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Input() user!: User; // TypeScript's Strict Class Initialization
  @Input() last!: boolean; //TypeScript's Strict Class Initialization
  @Output() onLoginSelection: EventEmitter<User> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  submitLogin() {
    this.onLoginSelection.emit(this.user);
  }

}
