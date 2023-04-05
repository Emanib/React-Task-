import { useState, useEffect } from 'react';
import { apiRequest } from '../Api/services'

const useFetch =  (productPerPage:number, currentPage :number ,searchValue:string)=>{
    const [manufacturers, setManufacturers] = useState([])
  
    const [loading, setLoading] = useState(false)
    const getManufacturers = async () => {
        setLoading(true)
        try {
        let data = await apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers?per_page=30&search=${searchValue.trim()}`, null, "GET")
            setManufacturers(data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
     
    }
    useEffect(() => {
        getManufacturers()
    }, [searchValue, productPerPage, currentPage])
    return {
        loading, 
        manufacturers,
        getManufacturers,
        setLoading
    }
}
export default useFetch