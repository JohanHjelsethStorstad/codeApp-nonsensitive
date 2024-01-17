import styles from './account.module.scss'
import scssVariables from '../styles/export.module.scss'
import AccountCard from '../components/AccountCard'
import Input from '../components/Input'
import getAccount from '../database/actions/getAccount'
import getNumberCoded from '../database/actions/getNumberCoded'
import getBatchesInfo from '../database/actions/getBatchesInfo'
import BatchesList from '../components/BatchesList'
import { useState, useRef } from 'react'
import axios from 'axios'

const Account = ({account, numberCoded, batches}) => {
    const [passwordFormActive, setPasswordFormActive] = useState(false)
    const [pictureFormActive, setPictureFormActive]= useState(false)

    const oldPassword = useRef()
    const newPassword = useRef()
    const confirmPassword = useRef()
    const picture = useRef()
    const [oldPasswordError, setOldPasswordError] = useState()
    const [newPasswordError, setNewPasswordError] = useState()
    const [confirmPasswordError, setConfirmPasswordError] = useState()
    const [pictureError, setPictureError] = useState()

    const changePassword = (e) => {
        e.preventDefault()
        if (!passwordFormActive) return setPasswordFormActive(true)
        axios.patch('/api/changePassword', {
            oldPassword: oldPassword.current,
            newPassword: newPassword.current,
            confirmPassword: confirmPassword.current
        }).then(res => {
            setPasswordFormActive(false)
            setOldPasswordError('')
            setNewPasswordError('')
            setConfirmPasswordError('')
            document.querySelector('.'+styles.passwordChangeSuccess).innerHTML = 'password was changed'
            setTimeout(() => document.querySelector('.'+styles.passwordChangeSuccess).innerHTML = '', 5000)
        }).catch(err => {
            setOldPasswordError(err.response.data.oldPassword)
            setNewPasswordError(err.response.data.newPassword)
            setConfirmPasswordError(err.response.data.confirmPassword)
        })
    }
    const changeAccountPicture = (e) => {
        e.preventDefault()
        if (!pictureFormActive) return setPictureFormActive(true)
        const formData = new FormData()
        formData.append('picture', picture.current) 
        axios.patch('/api/accountPicture', formData , {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            location.reload()
        }).catch(err => {
            setPictureError(err.response.data.error)
        })
    }
    const signOut = (e) => {
        e.preventDefault()
        axios.get('/api/signOut').then(res => {

        }).catch(console.log)
    }
    const handleUpload = (e) => {
        e.preventDefault()
        picture.current = e.target.files[0]
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.welcome}>Welcome back</div>
            <div className={styles.leftSide}>
                <AccountCard name={account.name} _id={account._id} id={account.id} team={account.team} numberCoded={numberCoded} admin={account.admin} />
                {
                    passwordFormActive ? (
                    <>
                    <div className={styles.form}>
                        <button className={styles.close} onClick={() => setPasswordFormActive(false)}> </button>
                        <Input color={scssVariables.blue} error={oldPasswordError} referance={oldPassword} name="old password" type='password'></Input>
                        <Input color={scssVariables.blue} error={newPasswordError} referance={newPassword} name="new password" type='password'></Input>
                        <Input color={scssVariables.blue} error={confirmPasswordError} referance={confirmPassword} name="confirm password" type='password'></Input>
                    </div>
                    </>
                    ): <></>
                }
                <div className={styles.passwordChangeSuccess}></div>
                <button onClick={changePassword}>change password</button>
                {
                    pictureFormActive ? (
                        <>
                        <div className={styles.form}>
                            <button className={styles.close} onClick={() => setPictureFormActive(false)}> </button>
                            <input onChange={handleUpload} type='file'></input>
                            <div className={styles.error}>{pictureError}</div>
                        </div>
                        </>
                    ): <></>
                }
                <button onClick={changeAccountPicture}>change profile picture</button>
                <button onClick={signOut}>sign out</button>
            </div>
            <div className={styles.batches}>
                {
                    batches.length ? <BatchesList batches={batches} /> : 
                        <div className={styles.noBatch}>You have no batches</div>
                }      
            </div> 
        </div>
    )
}

export async function getServerSideProps(context) {
    const account = await getAccount(context.req.cookies.code_jwt).then(account => {
        return {
            name: account.name,
            id: account.id,
            admin: account.admin,
            team: account.team,
            _id: account._id.toString()
        }
    })
    const numberCoded = await getNumberCoded(account._id)
    const batches = await getBatchesInfo(account._id)
    return { props: { account: account, numberCoded: numberCoded, batches: batches } }
}

export default Account