import styles from './Login.module.css'
import {useState} from 'react'
import React from 'react'
import { useLogin } from './../../hooks/useLogin';

const Login = (result) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isPending, setIsPending} = useLogin('')
  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password)
    console.log(result)
  }
  return (
    <form onSubmit={handleSubmit} className={styles['login-form']}>
      <h2>Login</h2>
      <label>
        <span>Username:</span>
        <input type="username" 
        onChange={(e) => setUsername(e.target.value)}
        value={username}
        />
      </label>
      <label>
        <span>Password</span>
        <input type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        />

      </label>
      {!isPending && <button className="btn">Login</button>}
      {isPending && <button className="btn">Loading...</button>}
      {console.log(isPending)}
      {error && <p>{error}</p>}
    </form>
  )
}

export default Login