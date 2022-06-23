import logo from './logo.svg'
import './App.css'
import { useDispatch, useSelector } from 'react-redux'
import { asyncSetName, setName } from './store/features/userSlice.js'
import { useGetUserListQuery } from "./store/api/user"
import { useState } from 'react'

function App () {
  const [show, setShow] = useState(false)
  const { user } = useSelector(state => state)
  const dispatch = useDispatch()

  const onChangeName = () => {
    dispatch(setName('jerry'))
  }

  const onAsyncChangeName = () => {
    dispatch(asyncSetName('jjjjjj'))
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          {user.name} -- {user.age}
        </p>
        <button onClick={() => setShow(!show)}>app1</button>
        <button onClick={onChangeName}>修改name</button>
        <button onClick={onAsyncChangeName}>异步修改name</button>
        {show && <App1 />}
      </header>
    </div>
  )
}


function App1 () {
  useGetUserListQuery(null)

  return (
    <div>App</div>
  )
}


export default App
