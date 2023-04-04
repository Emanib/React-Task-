import React  ,{useState} from 'react'
import  './style.css'
interface UserData {
  email:string, 
  password:string
}
interface Iprops {
  handleChange:  (event: React.ChangeEvent<HTMLInputElement>) => void, 
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void, 
  userData: UserData,
  loading: boolean

}
export default function LoginForm({ handleChange, handleSubmit, userData, loading }:Iprops) {
 
  return (
    <div className='wrapper-form' >
      <form  onSubmit={handleSubmit}>
        <label htmlFor="email"> email</label>
        <input type="text" name="email" id="email" onChange = { handleChange} value={userData.email} className='email'  />
        <label htmlFor="password"> password</label>
        <input type="password" id="password" name="password" onChange={handleChange} minLength={8} className='password'  value={userData.password}  />
        <button type ="submit">{loading? "loading":"login"}</button>
      </form>
    </div>
  )
}
