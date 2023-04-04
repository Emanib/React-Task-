import React ,{useEffect, useState} from 'react'
import LoginForm from '../../components/Form'
import { apiRequest } from '../../Api/services'
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const [loading, setLoading]=useState(false)
  const [status, setStatus]=useState(false)
const navigate = useNavigate()
useEffect(()=>{
  if (status) {
    navigate("/admin")
    setUserData({ email: "", password: "" })
  }
},[status ,navigate])
  async function fetchData() {
    try {
    setLoading(true)
   let data =   await apiRequest(`https://kayanpay.pro/api/v1/vendor/login`, userData, "POST")
   setLoading(false)
   console.log(data)
   setStatus(data.status)

    } catch (error) {
      console.log(error)
    }
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!!userData.email && userData.password){
      fetchData()

    }

  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setUserData(prev => ({ ...prev, [name]: value }))
  }
  return (
    <div>
      <LoginForm 
      handleChange={handleChange} 
      handleSubmit={handleSubmit} 
      userData={userData}  
      loading= {loading}
      />
    </div>
  )
}
