import { Component } from "@angular/core";
import { GitHubService } from "./github.service";
import { MachineService } from "./machine.service";
import { loadMachine } from "./loadMachine";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [MachineService]
})
export class AppComponent {
  machine = this.machineService.start(loadMachine, {
    services: {
      loadUser: (context) =>
        this.githubService
          .getUser(context.username)
          .pipe(map(r => ({ ...r, type: "USER_FETCHED" })))
    }
  });

  constructor(
    private githubService: GitHubService,
    private machineService: MachineService
  ) {}
}
