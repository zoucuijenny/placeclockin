import axios from 'axios'
const prefix='http://122.112.221.15:9900'
const sendUserId=function(){
  let me=this
  axios.get(prefix+'/api/push/login',{headers:{userId:sessionStorage.getItem('userId')}})
  .then((res)=>{
    if(res.data.status!==0){
     // me.$toast.fail(res.data.msg)
    }
   // me.$toast(res.data.msg)
  })
  .catch((err)=>{
    console.log(err)
  })
}
export default {
  sendUserId
}
