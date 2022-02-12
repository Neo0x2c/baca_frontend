import request from '@/utils/request.js'
const host = "http://ec2-54-178-107-66.ap-northeast-1.compute.amazonaws.com:9958"

//  登录接口   
export function login (data) {
  console.log("loing", data)
  var res = request({
    url: host + "/api_v2/login",
    method: "post",
    data
  })
  return res
}

//  注册接口  
export function register (data) {
  var res = request({
    url: host + "/api_v2/register",
    method: "post",
    data
  })
  return res
}

//绑定邀请码
export function bindParent (data) {
  console.log(data)
  var res = request({
    url: host + "/api_v2/auth/addinvite",
    method: "post",
    data
  })
  return res
}
