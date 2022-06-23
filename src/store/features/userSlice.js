import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import { createApi } from '@reduxjs/toolkit/dist/query/react'

function getUserName (name) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(name)
    }, 1000)
  })
}

const initialUser = {
  name: 'tom',
  age: 10
}
// thunkAPI = {getState, dispatch, ...}
export const asyncSetName = createAsyncThunk(
  'user/asyncSetName',
  async (payload, thunkAPI) => {
    const name = await getUserName(payload)
    // thunkAPI.dispatch(setName(name))
    return name
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setName (state, action) {
      state.name = action.payload
    }
  },
  extraReducers: builder => {
    builder.addCase(asyncSetName.fulfilled, (state, action) => {
      state.name = action.payload
    })
  }
})

export const { setName } = userSlice.actions

export default userSlice.reducer