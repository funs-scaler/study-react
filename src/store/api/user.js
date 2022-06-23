import baseApi from "./base"

const usersApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    getUserList: builder.query({
      query: (id) => {
        return '/users/list'
      },
      // transformResponse: response => response.data
      // 结果，错误，传参;指定tag，然后在mutation中invalidatesTags使缓存失效，自动重新请求
      providesTags: (result, error, id) => [{ type: 'user', id: 'LIST' }],
    }),
    getUserById: builder.query({
      query: id => {
        return `/users/${id}`
      },
      providesTags: (result, error, id) => [{ type: 'user', id }]
    }),
    createUser: builder.mutation({
      query: data => ({
        url: 'users',
        method: 'post',
        body: data
      }),
      // 指定失效的tag，可以是字符串/对象，新增需要使列表的缓存失效
      invalidatesTags: (result, error, data) => [{ type: 'user', id: 'LIST' }]
    }),
    updateUser: builder.mutation({
      query: data => ({
        url: `users/${data.id}`,
        method: 'put',
        body: data
      }),
      // 更新需要使列表以及指定id的缓存失效
      invalidatesTags: (result, error, data) => [
        { type: 'user', id: 'LIST' },
        { type: 'user', id: data.id }
      ]
    }),
  })
})

//导出可在函数式组件使用的hooks,它是基于定义的endpoints自动生成的
// use + endpointName + query/mutation
// result = {
//    currentData: undefined, // 当前参数的最新数据
//    data: undefined, // 最新数据
//    isError: false, // boolean
//    error: Error(),
//    isFetching: true, // 数据是否正在加载
//    isLoading: true, // 数据是否第一次正在加载
//    isSuccess: false,
//    isUninitialized: false, // 请求是否还没开始
//    refetch: f(), // function 重新请求数据
//    status: 'pending'
// }
// const [trigger, result] = useLazyGetUserListQuery() --> 调用trigger调用查询, refetch 忽略缓存获取数据
// const [trigger, result] = useCreateUserMutation() --> 同上
// options = {
//   selectFromResult: result => result, // 对数据进行过滤/操作
//   pollingInterval: 0, // 轮训请求的时间间隔ms
//   skip: false, // 是否跳过请求
//   refetchOnMountOrArgChange: false, // 是否每次都重新加载数据 false使用缓存/true不用缓存，number 数据缓存的时间秒
//   refetchOnFocus: false, // 是否在网页获取焦点时重新获取数据，需要在store上设置监听setupListeners
//   refetchOnReconnect: false, // 是否在重新联网时重新获取数据，需要在store上设置监听setupListeners
// }
// const [result] = useGetUserListQuery(params, options)


export const {
  useGetUserListQuery,
  useCreateUserMutation,
  // 惰性查询
  useLazyGetUserListQuery
} = usersApi

export default usersApi