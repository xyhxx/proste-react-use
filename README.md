<image src="https://raw.githubusercontent.com/xyhxx/program_preview/master/logo/react-use.png">

更多使用方法可以<a href="https://github.com/xyhxx/proste-react-use/tree/main/__tests__">查看测试</a>中的示例

## useClipboard

> 粘贴板 hook 可以通过 ref 绑定某个 input 节点复制对应的 value 值 这个在非受控节点上会非常有用 data-copy 或者通过
> copyToClipboard 复制到粘贴板

```typescript
function useClipboard(): readonly [
  React.MutableRefObject<null>,
  {
    readonly copyToClipboard: (text?: string | number | null | undefined) => Promise<string | number>;
    readonly getClipboard: () => Promise<string>;
  },
];
```

## useCountDown

> 倒计时 hook

```typescript
function useCountDown(options?: {
  targetDate?: DateType;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  interval?: number;
  onChange?: (
    time: number,
    parseTime: {
      days: number;
      hours: number;
      minutes: number;
      seconds: number;
      milliseconds: number;
    },
  ) => void;
  onComplete?: () => void;
}): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};
```

## useSuspense

> 配合 Suspense 组件使用 可以使用任意的 Promise 函数 key 需要是一个唯一值，如果你想复用父组件的信息可以使用和父组件相同
> 的 key

```typescript
useSuspense<R>(key: string | unknown[], fn: () => Promise<R>): R
```

## useBeforeMount

> 在 dom 挂载前触发

```typescript
function useBeforeMount(effect: EffectCallback): void;
```

## useContextWithEqual

> 比较相同 contexthook 判断返回数据是否有变化进行渲染 依赖 use-context-selector 使用 use-context-selector 的
> createContext 创建 congtext

```typescript
function useContextWithEqual<T, R>(context: Context<T>, selector: (state: T) => R): R;
```

## useMounted

> 只有在加载时触发一次的 useEffect

```typescript
function useMounted(effect: EffectCallback): void;
```

## useDelay

> 可以主动调用的延迟函数 返回一个函数 函数执行延迟调用传入的函数

```typescript
function useDelay<T>(fn: (state?: T) => void, delay: number): (state?: T | undefined) => void;
```

## useUpdateEffect

> 只有在依赖更新（除了第一次）触发

```typescript
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
```

## useEventEmitter

> 发布订阅钩子 事件只在全局初始化一次

只使用触发 const fire = useEventEmitter('key');

只进行监听 useEventEmitter('key', fn);

只监听一次 useEventEmitter('key', fn, true);

```typescript
function useEventEmitter<T>(key: string, listener?: (event: T) => void, once?: boolean): (args?: T | undefined) => void;
```
