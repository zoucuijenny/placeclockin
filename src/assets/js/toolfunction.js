

/**

 * 方法说明

 * @method 方法名

 * @for 所属类名

 * @param {参数类型} 参数名 参数说明

 * @return {返回值类型} 返回值说明

 */

/**
 * q去除字符串首尾空格

 * @method  trimFormate

 * @for tools

 * @param {string}

 * @return {string}

 */
 let tools={}
 tools.trimFormate=(string)=>{
  string.trim()
   return data
 }
/**
 * 值为 空字符串 ，undefind ,null 都返回false

 * @method  boolResult

 * @for tools

 * @param {string}

 * @return {string}

 */
 tools.boolResult=(data)=>{
   data=data.trim()
   if(data===''||data===null||data===undefined||data===false){
     return false
   }else{
     return true
   }
 }
/**
 * 时间戳转年-月-日：时-分-秒

 * @method  timeFormate

 * @for tools

 * @param {string} 13位的时间戳

 * @return {string}

 */
tools.timeFormate=(data)=>{
  let time=new Date(data)
  let y=time.getFullYear()
  let m=time.getMonth()+1
  let d=time.getDate()
  return y + '-'+ (m < 10  ? '0'+ m : m) + '-'+ (d <10  ? '0' + d : d) + ' ' + time.toTimeString().substring(0,8)
 // 或者
// time.toLocaleDateString().replace(/\//g, "-") + " " + time.toTimeString().substr(0, 8));
}

/**
 * 年-月-日：时-分-秒 转 时间戳转

 * @method  timeToTimeStamp

 * @for tools

 * @param {string}  date='2015-03-05 17:59:00.0'

 * @return {string}

 */

tools.timeToTimeStamp=(date)=>{
 date = date.substring(0,19);
  date = date.replace(/-/g,'/');
return  new Date(date).getTime();

}

/**
 * 验证邮箱格式是否正确

 * @method  valueEmail

 * @for tools

 * @param {string}

 * @return {string}

 */

tools.valueEmail=(address)=>{
  if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(address)) {
    return false;
  }
  else {
    return true;
  }
}

