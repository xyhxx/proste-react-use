## useTransition

> easing function animation

> reference resources：https://github.com/ai/easings.net

> If you want to customize the function, you can customize it here：https://cubic-bezier.com

```typescript
type EasingFunction = (x: number) => number;
type EasingList = [number, number, number, number];
type EasingFunctionOrList = EasingFunction | EasingList;

type Options = {
  duration?: number;
  delay?: number;
  transition?: EasingFunctionOrList;
  onComplete?: () => void;
};

function useTransition(value: number, options?: Options): number;
function useTransition(value: number[], options?: Options): number[];
```

```tsx
const [state, setState] = useState(0);

const result = useTransition(state);

setState(val => (val === 0 ? 10 : 0));
```

> Built in function Animation:

- LINEAR
- EASE_IN_SINE
- EASE_OUT_SINE
- EASE_IN_OUT_SINE
- EASE_IN_QUAD
- EASE_OUT_QUAD
- EASE_IN_OUT_QUAD
- EASE_IN_CUBIC
- EASE_OUT_CUBIC
- EASE_IN_OUT_CUBIC
- EASE_IN_QUART
- EASE_OUT_QUART
- EASE_IN_OUT_QUART
- EASE_IN_QUINT
- EASE_OUT_QUINT
- EASE_IN_OUT_QUINT
- EASE_IN_EXPO
- EASE_OUT_EXPO
- EASE_IN_OUT_EXPO
- EASE_IN_CIRC
- EASE_OUT_CIRC
- EASE_IN_OUT_CIRC
- EASE_IN_BLACK
- EASE_OUT_BLACK
- EASE_IN_OUT_BLACK
- EASE_IN_ELASTIC
- EASE_OUT_ELASTIC
- EASE_IN_OUT_ELASTIC
- EASE_OUT_BOUNCE
- EASE_IN_BOUNCE
- EASE_IN_OUT_BOUNCE
