import { Machine, actions } from "xstate";
const { assign } = actions;

export const loadMachine = Machine(
  {
    id: "loadMachine",
    initial: "idle",
    context: {
      username: 'timdeschryver',
      user: undefined
    },
    states: {
      idle: {
        on: {
          LOAD: "loading"
        }
      },
      loading: {
        invoke: {
          src: "loadUser",
          onDone: "success",
          onError: "error"
        },
        on: {
          USER_FETCHED: { actions: 'assignUser' },
          LOADED: "success",
          FAILED: "error"
        }
      },
      success: {
        type: "final"
      },
      error: {
        after: {
          2000: "idle"
        }
      }
    }
  },
  {
    actions: {
      assignUser: assign({
        user: (_, evt) => {
          console.warn(evt);
          return evt;
        }
      })
    }
  }
);
