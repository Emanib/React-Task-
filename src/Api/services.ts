const token = localStorage.getItem('token');

 export const apiRequest =(url:any, data:any = null ,method:string = 'GET' )=>{
    const options:any = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token || ''}` ,
            'Accept-Language': 'en'
        }
    }
    if(method !== "GET"){
        options.body = JSON.stringify(data);
    }
    return fetch(url, options)
         .then(response => response.json())
         .then(data => {
             if (data?.data?.token){
                 localStorage.setItem('token', data.data.token); 
             }
            //  console.log(data,"from api")
             return data
         })
         .catch(error => {
             console.error(error);
         });
}
