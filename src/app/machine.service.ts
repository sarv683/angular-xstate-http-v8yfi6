import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StateMachine, interpret, MachineOptions } from 'xstate';
import { Observable, fromEventPattern, merge } from 'rxjs';
import { map, filter, shareReplay } from 'rxjs/operators';


@Injectable()
export class MachineService {
  start(machine: StateMachine<any, any, any>, machineOptions: Partial<MachineOptions<any, any>>) {
    const service = interpret(machine.withConfig(machineOptions));

    const state$ = fromEventPattern(
      handler => {
        service
          .onTransition((a, b) => {
            console.log(b)
            return handler(a, b);
          })
          .start();

        return service;
      },
      (handler, service) => service.stop()
    ).pipe(
      map(([state]) => state),
      filter(({changed}) => changed  || changed === undefined),
      shareReplay(1)
    );

    return {
      state$,
      send: service.send
    }
  }
}