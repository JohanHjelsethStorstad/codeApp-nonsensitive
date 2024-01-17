//setter proxy og defalte responser
import axios from "axios"
import { useEffect } from "react"

const useAxiosConfig = () => {
    useEffect(() => {
        axios.interceptors.response.use((response) => {
            return Promise.resolve(response)
        }, (error) => {
            try {
                if (String(error.response.status)[0] == "5") {
                    location.href = '/serverError'
                } else if (error.response.status === 401) {
                    location.href = '/signIn'
                } else if (error.response.status === 403) {
                    location.href = '/adminNeeded'
                }
            } catch {
                
            }
            return Promise.reject(error);
        })
    }, [])

}

export default useAxiosConfig