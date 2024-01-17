import styles from './Input.module.scss'
import { useCallback } from 'react'

function Input({name, referance, error, type, color}) {
    type = type ?? "text"
    const handleChange = (e) => {
        e.preventDefault()
        referance.current = e.target.value
    }
    const setStartValue = useCallback(node => {
        if (!node) return 
        node.value = referance.current ?? ''
    })
    return (
        <div style={{color: color}} className={`${styles.wrapper} ` + (error ? `${styles.red}` : '')}>
            <input ref={setStartValue} style={{borderColor: color}} type={type} onChange={handleChange} className={styles.field} placeholder={name} name={name}/> 
            <label style={{color: color}} className={styles.labe}>{name}</label>
            {error ? <div className={styles.error}>{error}</div> : <></>}
        </div>
    )
}

export default Input