import { useState } from "react"
import axios from "axios"



export const UseFetch = () => {
    const [data, setData] = useState<any | []>([])
    const [message, setMesage] = useState("")
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    
    const onFetch = async ({url, method, payload} : {url: string, method: string, payload?:any}) => {
        setLoading(true)
        try {
            let response;
            switch (method) {
                case 'GET':
                    response = await axios.get(url);
                    break;
                case 'POST':
                    response = await axios.post(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`, payload);
                    break;
                case 'PUT':
                    response = await axios.put(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`);
                    break;
                case 'DELETE':
                    response = await axios.delete(`${import.meta.env.VITE_REACT_APP_BASE_URL}${url}`);
                    break;
                default:
                    throw new Error(`Unsupported method: ${method}`);
            }

            setData(response.data.data)
            setMesage(response.data.message)
  
            
        } catch (error: any) {
            setIsError(true)           
            setMesage(error.response.data.message)
        } finally {
            setLoading(false)
        }
    }
   
    return {data, loading, isError, onFetch, message}
}