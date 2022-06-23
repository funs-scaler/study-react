import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
// import axios from 'axios'

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:4000/',
  // prepareHeaders: (headers, { getState }) => {
  //   const token = getState().auth.token;
  //   if (token) {
  //     headers.set('authorization', `Bearer ${token}`);
  //   }
  //   return headers;
  // }, 
})
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  console.log(result)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseQuery('/refreshToken', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      // api.dispatch(tokenReceived(refreshResult.data))
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      // api.dispatch(loggedOut())
    }
  }
  return result
}

const baseApi = createApi({
  baseQuery: baseQueryWithReauth,  // 可自定义query
  reducerPath: 'baseApi',
  // 缓存，默认时间是秒，默认时长60秒，可在endpoint里单独配置
  keepUnusedDataFor: 60,
  tagTypes: ['user'], // 指定api中的标签类型，不写也可，指定了后面会自动提示
  endpoints: () => ({})
})


export default baseApi


// const axiosBaseQuery =
//   ({ baseUrl, timeout = 30 } = { baseUrl: '', timeout: 30 }) =>
//     async ({ url, method, data, params }) => {
//       console.log(url, method, data, params)
//       try {
//         const result = await axios({
//           baseURL: baseUrl,
//           timeout: timeout,
//           url: url,
//           method,
//           data,
//           params
//         })
//         console.log(result)
//         return { data: result.data }
//       } catch (axiosError) {
//         let err = axiosError
//         return {
//           error: {
//             status: err.response?.status,
//             data: err.response?.data || err.message,
//           },
//         }
//       }
//     }