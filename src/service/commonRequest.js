import axios from "axios";

//defining a function to set common api call using axios 

export const commonRequest=async(method,url,body)=>{

// req configuration

    let reqConfig={
        method,
        url,
        data:body,
        headers:{
            "content-type":"application/json"
        }
    }

    // api call using axios library

   return await axios(reqConfig).then((response)=>{
        return response
    }).catch((err)=>{
        return err
    })


}