import styles from './Switch.module.scss'
import { useCallback } from 'react'

function Switch({referance}) {
    const setStartValue = useCallback(node => {
        if (!node) return
        node.checked = referance.current ?? ''
    })
    const handleChange = (e) => {
        referance.current = e.target.checked
    }
    return (
        <label className={styles.switch}>
            <input onChange={handleChange} ref={setStartValue} type="checkbox"/>
            <span className={styles.slider}></span>
        </label>
    )
}

export default Switch