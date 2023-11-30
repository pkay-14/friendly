import axios from "axios";

export function postRequest(reqUrl, params){
     return axios.post(reqUrl, params)
}

export function getRequest(reqUrl, params = null){
    if (params){
        return axios.get(reqUrl, params)
    }else{
        return axios.get(reqUrl)
    }
}
export function isLoggedIn(){
    const storedUser = JSON.parse(localStorage.getItem('userData'))
    return storedUser && storedUser.username ? true : false 
}
