import React from 'react'
interface IProps {
  name:string, 
  id?:string, 
  label :string, 
 className?:string, 
 type:string, 
 value:string, 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function Input({ name, id, label, className, type, onChange, value }: IProps) {

  return (
    <div className= {className}  >
        <label htmlFor={id}>{label}</label>
        <input type={type} name = {name} onChange={onChange} id = {id}  value = {value} />
    </div>
  )
}
