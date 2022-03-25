<image src="https://raw.githubusercontent.com/xyhxx/program_preview/master/logo/proste-tarp-hooks.png">

## useBeforeMount

> 在 dom 挂载前触发

```typescript
function useBeforeMount(effect: EffectCallback): void;
```

## useContextWithEqual

> 比较相同 contexthook 判断返回数据是否有变化进行渲染 依赖 use-context-selector 使用
> use-context-selector 的 createContext 创建 congtext

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

> 发布订阅钩子

只使用触发 const fire = useEventEmitter('key');

只进行监听 useEventEmitter('key', fn);

只监听一次 useEventEmitter('key', fn, true);

```typescript
function useEventEmitter<T>(
  key: string,
  listener?: (event: T) => void,
  once?: boolean,
): (args?: T | undefined) => void;
```