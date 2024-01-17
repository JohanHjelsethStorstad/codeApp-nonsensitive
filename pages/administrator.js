import styles from './administrator.module.scss'
import scssVariables from '../styles/export.module.scss'
import { v4 as uuid } from 'uuid'
import AccountCard from '../components/AccountCard'
import Input from '../components/Input'
import Switch from '../components/Switch'
import BatchesList from '../components/BatchesList'
import getAllAccounts from "../database/actions/getAllAccounts"
import getNumberCoded from '../database/actions/getNumberCoded'
import { useRef, useState, useCallback, useEffect } from 'react'
import axios from 'axios'


const Administrator = ({accounts}) => {
    const name = useRef('')
    const id = useRef()
    const password = useRef('')
    const confirmPassword = useRef('')
    const team = useRef('')
    const admin = useRef(false)
    const [nameError, setNameError] = useState('')
    const [idError, setIdError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [teamError, setTeamError] = useState('')
    const [formDown, setFormDown] = useState(false)
    const [formHeight, setFormHeight] = useState(0)
    const firstTime = useRef(1) //første gang animerer ikke
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [batches, setBatches] = useState([])

    const handleCreateAccount = (e) => {
        e.preventDefault()
        if (!formDown) {
            setFormDown(true)
            return  
        }
        axios.post('/api/admin/createAccount', {
            name: name.current,
            id: id.current,
            password: password.current,
            confirmPassword: confirmPassword.current,
            admin: admin.current,
            team: team.current
        }).then(res => {
            location.reload()
        }).catch(err => {
            setNameError(err.response.data.name)
            setIdError(err.response.data.id)
            setPasswordError(err.response.data.password)
            setConfirmPasswordError(err.response.data.confirmPassword)
            setTeamError(err.response.data.team)
        })
    }

    const handleTeamChange = (e) => {
        team.current = e.target.value
    }

    const handleFormUp = (e) => {
        e.preventDefault()
        setFormDown(false)
    }

    const handleFormHeight = useCallback(node => {
        if (!node) return
        new ResizeObserver(event => {
            setFormHeight(node.offsetHeight)
        }).observe(node)
    }) 

    const handleAccountSelection = (_id) => {
        setSelectedAccount(_id)
    }
    useEffect(() => {
        if (!selectedAccount) return setBatches(null)
        setBatches('loading')
        axios.post('/api/admin/batches', {account: selectedAccount}).then(res => {
            setBatches(res.data.batches)
        }).catch(err => setBatches(null))
    }, [selectedAccount])

    useEffect(() => {
        if (!formDown) {
            if (firstTime.current) {
                document.querySelector(`.${styles.accounts}`).style.transition = "none"
                setTimeout(() => {document.querySelector(`.${styles.accounts}`).style.transition = ""}, 200)
                firstTime.current = 0
            }
            
            document.querySelector(`.${styles.accounts}`).style.transform = `translateY(-${formHeight}px)`
            document.querySelector(`.${styles.accounts}`).style.marginBottom = -formHeight+'px'
        } else {
            document.querySelector(`.${styles.accounts}`).style.transform = `translateY(0)`
            document.querySelector(`.${styles.accounts}`).style.marginBottom = 0
        }
    }, [formDown, formHeight])

    const content = () => {
        if (Array.isArray(batches) && batches.length === 0) {
            return <div className={styles.text} >Coder has no batches</div>
        }
        if (batches === 'loading') {
            return <div className={styles.text}>loading...</div>
        }
        if (batches) {
            return <BatchesList batches={batches} />
        }
        
        return <div className={styles.text}>Please select an account on the left</div>
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.leftSide}>
                <div className={styles.accountsHeader}>accounts</div>
                <div className={styles.accountsOverflowWrapper}>
                    <div className={styles.accounts}>
                        <form className={styles.createAccount}>
                            <div ref={handleFormHeight} className={styles.inputs}>
                                <button className={styles.formUpButton} onClick={handleFormUp}></button> 
                                <Input name='name' referance={name} error={nameError} type='text' color={scssVariables.blue}/>
                                <Input name='id' referance={id} error={idError} type='number' color={scssVariables.blue}/>
                                <Input name='password' referance={password} error={passwordError} type='password' color={scssVariables.blue}/>
                                <Input name='confirm password' referance={confirmPassword} error={confirmPasswordError} type='password' color={scssVariables.blue}/>
                                <div className={`${styles.team} ` + (teamError ? `${styles.error}` : '')}>
                                    <label>team</label>
                                    <div className={styles.choices} onChange={handleTeamChange}>
                                        <div>
                                            <label>A</label>
                                            <input name="team" type="radio" value='A'></input>
                                        </div>
                                        <div>
                                            <label>B</label>
                                            <input name="team" type="radio" value='B'></input>
                                        </div>
                                    </div>
                                    {teamError ? <div>{teamError}</div> : <></>}
                                </div>
                                <div className={styles.admin}>
                                    <label className={styles.adminText}>admin</label>
                                    <Switch referance={admin} />
                                </div>
                            </div>
                            <button onClick={handleCreateAccount} className={styles.createButton}>create account</button> 
                        </form>
                        <div className={styles.accountList}>
                            {accounts.map(account => 
                            <div key={uuid()} className={selectedAccount === account._id ? styles.selectedAccount : ''}>
                                <AccountCard key={uuid()} {...account} />
                                <button onClick={() => handleAccountSelection(account._id)}></button>
                            </div> 
                            )}
                        </div>
                    </div>
                </div>
            </div>
            
            <div className={styles.accountInfo}>
                {content()}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const data = await getAllAccounts()
    const accounts = []
    for (let account of data) {
        const numberCoded = await getNumberCoded(account._id)
        accounts.push({
            _id: account._id.toString(), 
            name: account.name,
            id: account.id,
            admin: account.admin,
            team: account.team,
            numberCoded: numberCoded
        })
    }
    return { props: { accounts } }
}

export default Administrator