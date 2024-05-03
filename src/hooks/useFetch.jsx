import { useEffect, useState } from "react"


export const useFetch = (url) => {

    const [data , setData] = useState([])

    useEffect( () => {

        const getDatos = async () => {
            
            let controller = new AbortController()

            try {

                 let options = { signal : controller.signal}
                 let response = await fetch( url , options)
                 let data = await response.json()
                 setData(data)

            } catch (error) {
                console.log(error)
            } finally{
                controller.abort()
            }

        }
        getDatos()

    } , [])
    
    return data
}