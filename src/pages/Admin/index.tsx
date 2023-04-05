import React, {useState, useEffect} from 'react'
import { apiRequest } from '../../Api/services'
import Switch from '../../components/Switch'
import Pagination from '../../components/Pagination'
import upload from '../../images/upload.png'
import Modal from '../../components/Modal'
import './style.css'
import Input from '../../components/Input'
import { useTranslation } from "react-i18next";

export default function Admin() {
    const [manufacturers, setManufacturers] =useState([])
    const [searchValue, setSearchValue]=useState("") //should handle case debounce for many requests 
    const [currentPage ,setCurrentPage]=useState(1)
    const [productPerPage, setProductPerPage]=useState(3)
    const [loading, setLoading]=useState(false)
    const [isOpen , setIsOpen]=useState(false)
    const [image,setImage]=useState<any>("")
    const [selectOptions, setSelectOptions]=useState("")
    const [id, setId] =useState<string>("")
    const [selectLang ,setSelectLang] =useState("en")
    const [status, setStatus]=useState(false)
    const [manufactureData, setManufactureData]=useState <any>({
        sort: "",
 
    })
    const [wordEnglish, setWordEnglish]=useState("")
    const [wordArabic, setWordArabic]=useState("")

    const { t, i18n } = useTranslation();

     const getManufacturers = async()=>{
        setLoading(true)
         let data = await apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers?per_page=30&search=${searchValue.trim()}`,null, "GET")
         setLoading(false)
       setManufacturers(data.data)
    }
    useEffect(()=>{
    getManufacturers()
    }, [searchValue, productPerPage, currentPage]) 
    const handleNameEnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWordEnglish(e.target.value);
    };

    const handleNameArChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWordArabic(e.target.value);
    };
 const getManufactureDetails = async ()=>{
    let data;
    
     data = await apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers/${id}`, null, "GET")
     setManufactureData({
         sort: data?.data?.sort_order || "",
  
     })
     setWordEnglish(data?.data?.name?.en)
     setWordArabic(data?.data?.name?.ar)
 
 }

    useEffect(() => {
        if (!!id) {
            getManufactureDetails()
        }
    }, [id])

    useEffect(()=>{
        if (status) {
            getManufacturers()
            handleCloseModal()
        }
    },[status])

    const lastProductIndex = currentPage * productPerPage;
    const firstProductIndex = lastProductIndex - productPerPage;
    const currentProducts = manufacturers?.slice(firstProductIndex, lastProductIndex);
 
    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };
    const convertToBase64 = (e:any)=>{
        let reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload =()=>{
    
            setImage(reader.result)
        }

    }
   
     // detect language 
    // function isArabic(strInput) {
    //     var arregex = /[\u0600-\u06FF]/;
    //     if (arregex.test(strInput)) {
    //         console.log('Yes, Has Arabic Characters');
    //     } else {
    //         console.log('No, Has Not Arabic Characters');
    //     }
    // }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    const {name, value} =e.target

      if (name ==="sort"){
        setManufactureData((prev:any) => ({ ...prev, sort:value }))

    }
   
 }
 const handleDeleteManufacture = (id :string)=>{
     apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers/${id}`,null, "DELETE")
 }
    const handleOptionSelect = (e: React.ChangeEvent<HTMLSelectElement> ,id:string)=>{
  setSelectOptions(e.target.value)

   if(e.target.value ==="update"){
       setId(id)
    setSelectOptions("")
    handleOpenModal()
   }
     if (e.target.value === "delete"){
     setSelectOptions("")
     handleDeleteManufacture(id)
    getManufacturers()
  
     }
    }
console.log(manufactureData,"data changes", wordArabic, wordEnglish)
 const submitData = async ()=>{
    const {sort} = manufactureData
    if( !!manufactureData.sort && !!image ){
        const sendData = {
       
            name:{
                ar:wordArabic, 
                en:wordEnglish
            },
            "image":image,
             sort:+sort
        } 
        console.log(sendData,"sendd")
        let data ; 
        if (id){
            data = await apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers/${id}`, sendData, "PUT")
        }else {
            data = await apiRequest(`https://kayanpay.pro/api/v1/vendor/manufacturers`, sendData, "POST")
        }
        setStatus(data.status)
         
    }
 

 }
    const hiddenFileInput:any = React.useRef(null);
    const handleClick = () => {
        hiddenFileInput.current.click();
    };
    const handleCancel = ()=>{
        handleCloseModal()
        setManufactureData({  sort: "" })
        setWordArabic("")
        setWordEnglish("")
        setImage("")
    }
    const handleUpdateSwitch = (id:string ,status:number)=>{
        let sendData; 
         status ===0 ? sendData = {status: 1} : sendData = {status:0}
        apiRequest(`API_URLvendor/manufacturers/status/${id}`, sendData, "PUT")
        getManufacturers()
    }
    const handleLanguageSelect = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setSelectLang(e.target.value)
   
    }
  
    const handleChangePage = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setSearchValue(e.target.value)
    setCurrentPage(1)
}
  return (
    <div className='container'> 
     <div className='search-input'>
    <input type="text" placeholder='search product' onChange={handleChangePage} />
        <button className='add-product' onClick={handleOpenModal}  >Add product</button>
     </div>
    <div  className='wrapper-products' >
          <table className="products-table">
              <thead>
                  <tr>
                      <th>Manufacture</th>
                      <th>
                         <select  value={selectLang} onChange = {(e)=> handleLanguageSelect(e)} >
                            {/* <option value=""> select</option> */}
                            <option value="en"> Name in English</option>
                            <option value="ar"> Name in Arabic </option>
                        </select>
                      </th>
                      <th>sort order</th>
                      <th>status</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
                  
                    {  loading? <div>loading ..</div> :
                      currentProducts?.map((item: any) => (
                      <tr key = {item.id} > 
                      <td><img  src= {item.image} alt="" /></td>
                      {/* <td>{item.name.en}</td> */}
                      <td> {selectLang === "en"? item.name.en : item.name.ar} </td>
                       <td>{item.sort_order}</td>
                        <td>
                     <Switch status={item.status} handleUpdateSwitch ={  ()=> handleUpdateSwitch(item.id , item.status) }  />
                        </td>
                        <td>
                            <select  value = {selectOptions} onChange={ (e)=> handleOptionSelect (e, item.id)}  >
                                <option value=""> Actions</option>
                                <option value="update"> update</option>
                                <option value="delete"> delete</option>
                            </select>
                        </td>
                        </tr>
                          ))
                    }
                    
              </tbody>
          </table>
          <div className='wrapper-pagination'>
              <div className='pagination' >
                      <Pagination pages={productPerPage} currentPage={currentPage} setPage={setCurrentPage} totalProducts={manufacturers?.length}  />
              </div>
              <div>
              <select value={productPerPage} onChange={(e) => setProductPerPage(+e.target.value)} >
                  <option value="3">3</option>
                  <option value="5">5</option>
              </select>
              </div>
              </div>
         </div>
          <Modal open={isOpen} onClose={handleCloseModal} title= "Add Manufacture"  >
              <div>
                   <div className='upload image'>
                      <img src={ image =="" || null? upload : image} alt="uploadphoto" onClick={handleClick} />
                      <input type="file" accept='image/*' ref={hiddenFileInput}  onChange = {convertToBase64} style={{display:"none"}}   />
                   </div>
      
                 <div className='add-manufacture'>
                    {/* <div className='multi-lang' >  */}
                      <Input type="text" label="Name" name="name" value={i18n.language === 'ar'? wordArabic: wordEnglish} onChange={i18n.language === 'ar' ? handleNameArChange : handleNameEnChange}  />
                      <Input type="text" label="order" name="sort" placeholder="enter number" value= {manufactureData.sort} isOrder ={true} onChange={handleChange} />
                   <div className='actions'>
                    <button className='cancel-btn' onClick={handleCancel} >cancel </button>
                    <button className='save-btn' onClick={submitData} > save changes </button>
                 </div>
              </div>
              </div>
          </Modal>
      </div>
  )
}
