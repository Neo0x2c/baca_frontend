import request from '@/utils/request.js'
const host="http://ec2-54-178-107-66.ap-northeast-1.compute.amazonaws.com" 
//  登录接口   
export function login1(data) { 
  console.log("loing",data) 
  var res = request({  
      url: host + "/api/user/login",
      method: "post",
      data
  }) 
  return res
}   

//  登录接口   
export function login(param) { 
  console.log("loing",param) 
  var res = request({  
      url: host + "/api/user/login?email=" + param.email +  "&password="+ param.password,
      method: "get" 
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

//绑定邀请码
export function bindParent(data) { 
  console.log(data) 
  var res = request({  
      url: host + "api/user/bindParent",
      method: "post",
      data
  }) 
  return res
}
