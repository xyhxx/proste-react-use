<image src="https://raw.githubusercontent.com/xyhxx/program_preview/master/logo/react-use.png">

中文|<a href='./docs/en.md'>EN</a>

更多使用方法可以<a href="https://github.com/xyhxx/proste-react-use/tree/main/__tests__">查看测试</a>中的示例

## 生命周期

- [`useMounted`](./docs/useMounted/cn.md),[`useLayoutMounted`](./docs/useLayoutMounted/cn.md)

`只有在加载时触发一次`

- [`useSuspense`](./docs/useSuspense/cn.md)

`配合 Suspense 组件使用 可以使用任意的 Promise 函数 key 需要是一个唯一值， 如果你想复用父组件的信息可以使用和父组件相同的 key`

- [`useUpdateEffect`](./docs/useUpdateEffect/cn.md),[`useUpdatedLayoutEffect`](./docs/useUpdatedLayoutEffect/cn.md)

`只有在依赖更新（除了第一次）触发`

## Web API

- [`useRequestAnimationFrame`](./docs/useRequestAnimationFrame/cn.md)

`requestAnimationFrame hook`

- [`useMemory`](./docs/useMemory/cn.md)

`获取当前内存信息。 useMemory使用的是performance.memory API，是谷歌浏览器提供的非标准扩展，注意使用方式！`

- [`useIntersectionObserver`](./docs/useIntersectionObserver/cn.md),[`useIntersectionObserverState`](./docs/useIntersectionObserverState/cn.md)

`创建一个IntersectionObserver的API，useIntersectionObserver和useIntersectionObserverState的区别是useIntersectionObserver通过回调获取信息，useIntersectionObserverState会将回调的内容作为state返回。两者都可以中断监听和恢复监听。`

- [`useClipboard`](./docs/useClipboard/cn.md)

`可以通过 ref 绑定某个 input 节点复制对应的 value 值， 这个在非受控节点 上会非常有用。 或者通过 copyToClipboard 复制到粘贴板`

- [`useEyeDropper`](./docs/useEyeDropper/cn.md)

`屏幕取色器，可以获取当前屏幕上选中区域的颜色。`

- [`useWebSocket`](./docs/useWebSocket/cn.md)

`web socket hook`

- [`useBroadcastChannel`](./docs/useBroadcastChannel/cn.md)

`BroadcastChannel 通讯 API`

## 动画

- [`useTransition`](./docs/useTransition/cn.md)

`数字缓动动画 内置部分缓动动画函数`

## 状态

- [`useContextWithEqual`](./docs/useContextWithEqual/cn.md)

`比较相同 context 判断返回数据是否有变化进行渲染 依赖 `[`use-context-selector`](https://github.com/dai-shi/use-context-selector)`。 使用 use-context-selector 的 createContext 创建 context。`

- [`useMap`](./docs/useMap/cn.md), [`useSet`](./docs/useSet/cn.md)

`Map 和 Set的hook实现`

- [`useWeakMap`](./docs/useWeakMap/cn.md), [`useWeakSet`](./docs/useWeakSet/cn.md)

`WeakMap 和 WeakSet的hook实现`

## 工具

- [`useJWT`](./docs/useJWT/cn.md)

`解码jwt hook`

- [`useCountDown`](./docs/useCountDown/cn.md)

`倒计时信息。如果设置了 targetDate 后继续配置 days 等参数 会在 targetDate 的基础上累加。`

- [`useDelay`](./docs/useDelay/cn.md)

`可以主动调用的延迟函数，返回一个函数，函数执行延迟调用传入的函数。`

- [`useEventEmitter`](./docs/useEventEmitter/cn.md)

`发布订阅钩子，实例只在全局初始化一次。`

- [`useAsyncLock`](./docs/useAsyncLock/cn.md)

`异步函数锁，在异步函数执行完成执行不会再执行，会返回一个 undefind。`

- [`useMoneyFormat`](./docs/useMoneyFormat/cn.md)

`格式化货币金额`

- [`useClassNames`](./docs/useClassNames/cn.md)

`将各种类型的数据合并成一个 string 类型返回用于 className`
