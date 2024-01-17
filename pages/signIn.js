import styles from "./signIn.module.scss"
import scssVariables from '../styles/export.module.scss'
import Input from "../components/Input"
import axios from "axios"
import { useRef, useState } from "react"

const SignIn = () => {
    const name = useRef()
    const password = useRef()
    const [nameError, setNameError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [generalError, setGeneralError] = useState('')

    const handleSignIn = (e) => {
        e.preventDefault()
        axios.post('/api/signIn', {
            name: name.current,
            password: password.current
        }).then(res => {
            console.log("signed in: " + res.data)
            location.href = '/'
        }).catch(err => {
            setNameError(err.response.data.name)
            setPasswordError(err.response.data.password)
            setGeneralError(err.response.data.general)
        })
    }
    return (
        <div className={styles.wrapper}>
            <form>
                <div className={styles.header}>Sign In</div>
                <Input color={scssVariables.blue} error={nameError} referance={name} name="name"></Input>
                <Input color={scssVariables.blue} error={passwordError} referance={password} name="password" type="password"></Input>
                {generalError ? <div className={styles.error}>{generalError}</div> : <></>}
                <button onClick={handleSignIn}>sign in</button>
            </form>
        </div>
    )
}
export default SignIn