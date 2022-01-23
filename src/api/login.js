import request from '@/utils/request.js'
const host="http://ec2-54-178-107-66.ap-northeast-1.compute.amazonaws.com" 
//  登录接口   
export function login(data) { 
  console.log("loing",data) 
  var res = request({  
      url: host + "/api/user/login",
      method: "post",
      data
  }) 
  return res
}   

//  注册接口  
export function register(data) { 
  console.log(data) 
  var res = request({  
      url: host + "/api/user/reg",
      method: "post",
      data
  }) 
  return res
}