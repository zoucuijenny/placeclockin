import axios from 'axios'



const request=axios.create({

})

request.interceptors.request.use(
  config=>{},
  err=>Promise.reject(err)
)
 request.interceptors.response.use(
   res=>res,
   err=>{
     Promise.reject(err)
   }
 )

export default request
