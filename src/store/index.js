import { combineReducers, configureStore } from "@reduxjs/toolkit"
// import { setupListeners } from "@reduxjs/toolkit/dist/query"
import baseApi from "./api/base"
import userReducer from "./features/userSlice"

const reducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer
})

// baseApi.middleware 使用 RTKQ 的缓存功能
const middlewareHandler = getDefaultMiddleware => {
  return [...getDefaultMiddleware(), baseApi.middleware]
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => middlewareHandler(getDefaultMiddleware)
})

// 设置后才会支持refetchOnFocus refetchOnReconnect
// setupListeners(store.dispatch)

export default store

// 自定义错误中间件
// export const rtkQueryErrorLogger: Middleware =
//   (api: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
//     console.log(action, '中间件中非错误的时候', api)
//     // 只能拦截不是200的时候
//     if (isRejectedWithValue(action)) {
//       console.log(action, '中间件')
//       // console.log(action.error.data.message, '错误信息');
//       console.warn(action.payload.status, '当前的状态')
//       console.warn(action.payload.data?.message, '错误信息')
//       console.warn('中间件拦截了')
//       // TODO 自己实现错误提示给页面上
//     }
//     return next(action)
//   }