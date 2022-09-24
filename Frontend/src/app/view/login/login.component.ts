import {Component, OnInit} from '@angular/core';
import {User} from "../../interface/User";
import {UserService} from "../../services/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users: (User)[] = [];


  constructor(private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users = users, error: (err) => {
        console.error(err);
        this.users = [];
      }
    });
  }

  storeLoginAndRedirect(selectedUser: User): void {
    this.userService.loginUser(selectedUser).subscribe({
      next: (newToken) => {
        localStorage.clear();
        localStorage.setItem("token", newToken.token);
        localStorage.setItem("tokenExp", String(newToken.tokenExp));
        localStorage.setItem("userId", String(selectedUser.id));
        this.router.navigate(["/library"])
      }, error: (err) => {
        console.error(err);
        localStorage.clear()
      }
    });
  }
}
