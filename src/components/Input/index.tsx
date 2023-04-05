import React from 'react'
import './style.css'
import { useTranslation } from 'react-i18next';
import lebnon from '../../images/lebnon.png'
import british from '../../images/british.png'
interface IProps {
  name:string, 
  id?:string, 
  label :string, 
 className?:string, 
 type:string, 
 value:string, 
  isOrder?:boolean,
  placeholder?:any,
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
export default function Input({ name, id, label, className, type, onChange, value, isOrder, placeholder }: IProps) {
  const { t, i18n } = useTranslation();
  // const handleLanguageChange = () => {
  // ;
  // };
  return (
    <div className= {className}  >
    <div className='multi-lang' > 
    <div> 
      <label htmlFor={id}>{ !isOrder? t('name'):label }</label>
        </div>
       { !isOrder? <div className='languages'>
        <div className='container-btn'>
            <img src={british} alt="" className='english-flag' onClick={() => i18n.changeLanguage("en")} />
            <img src={lebnon} alt="" className='english-flag' onClick={() => i18n.changeLanguage("ar")} />

          </div>
       
        </div> :null}
      </div>
      <input type={type} name={name} placeholder={ !isOrder?  t('placeholder') :  placeholder} onChange={onChange} id={id} value={value} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}  />
    </div>
  )
}
