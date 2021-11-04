import axios, { AxiosRequestConfig } from "axios"

const HOST = '127.0.0.1:8080'

export async function getAllProducts(){
    try {
        const response = await axios.get(`http://${HOST}/api/productos`)

        return response.data;
    }
    catch (error:unknown) {
        console.log(error);        
    }

}

export async function getProductById(id:number){
    try {
        const response = await axios.get(`http://${HOST}/api/productos/${id}`)

        return response.data;
    }
    catch (error:unknown) {
        console.log(error);        
    }
}

export async function updateProduct(id:number, producto:any){
    try {

        const config:AxiosRequestConfig = {}
        
        const response = await axios.put(`http://${HOST}/api/productos/${id}`, producto, config)

        return response.data;
    }
    catch (error:unknown) {
        console.log(error);        
    }
}

export async function deleteProduct(id:number){
    try {
        const response = await axios.delete(`http://${HOST}/api/productos/${id}`)
        
        return response.data;
    }
    catch (error:unknown) {
        console.log(error);        
    }
}

export async function createProduct(producto:any){
    try {
        const response = await axios.post(`http://${HOST}/api/productos`, producto)

        return response.data;
    }
    catch (error:unknown) {
        console.log(error);        
    }
}