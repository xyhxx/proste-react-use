## useContextWithEqual

> Compare the same contexthook to judge whether the returned data has changed for rendering, and rely on the use context
> selector to create a congtext using the createcontext of the use context selector

```typescript
function useContextWithEqual<T, R>(context: Context<T>, selector: (state: T) => R): R;
```

```jsx
// state.ts
type State = ReturnType<typeof state>;
type Action = { type: 'inc' } | { type: 'add' };

function state() {
  return {
    count: 0,
    num: 0,
  };
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'inc':
      return { ...state, count: state.count + 1 };
    case 'add':
      return { ...state, num: state.num + 1 };
    default:
      return state;
  }
}
export const context = createContext<[State, Dispatch<Action>]>([state(), () => null]);


// index.tsx
const Chil: FC = function () {
    const result = useContextWithEqual<[State, Dispatch<Action>], [number, Dispatch<Action>]>(
      context,
      function (c) {
        return [c[0].count, c[1]];
      },
    );

    function inc() {
      result[1]({ type: 'inc' });
    }

    function add() {
      result[1]({ type: 'add' });
    }

    useEffect(
      function () {
        fn();
      },
      [result],
    );

    return (
      <>
        <p data-testid='count'>{result[0]}</p>
        <button data-testid='inc' onClick={inc}>
          inc
        </button>
        <button data-testid='add' onClick={add}>
          add
        </button>
      </>
    );
  };

  const Father: FC = function ({ children }) {
    const providerState = useReducer(reducer, state());
    const { Provider } = context;

    return <Provider value={providerState}>{children}</Provider>;
  };

  const Component: FC = function () {
    return (
      <Father>
        <Chil />
      </Father>
    );
  };
```
