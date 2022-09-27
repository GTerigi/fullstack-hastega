import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../../interface/User";
import {UserService} from "../../services/user-service/user.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
  animations: [
    trigger('fadeIn', [
      state('hide', style({opacity: 0})),
      state('visible', style({opacity: 1})),
      transition('hide => visible', animate('500ms ease-in')),
    ]),
  ]
})
export class UserLoginComponent implements OnInit {
  @Input() user!: User; // TypeScript's Strict Class Initialization
  @Input() last!: boolean; //TypeScript's Strict Class Initialization
  @Output() onLoginSelection: EventEmitter<User> = new EventEmitter();

  iconIsLoading: boolean = true;
  iconSrc!: string | ArrayBuffer | null;
  fallbackIcon: string = './../assets/round-default-icon.png';
  transitionState = 'hide';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.getIcon(this.user.id).subscribe({
      next: (data) => {
        this.createImageFromBlob(data);
      }
    })
  }

  submitLogin() {
    this.onLoginSelection.emit(this.user);
  }

  private createImageFromBlob(image: Blob) {
    let reader = new FileReader();
    this.iconIsLoading = false;
    reader.addEventListener("load", () => {
      this.iconSrc = reader.result;
      this.transitionState = 'visible';
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }
}
