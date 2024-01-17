import styles from './PieChart.module.scss'
import scssVariables from '../../styles/export.module.scss'
import { useCallback, useState } from 'react'

function PieChart({ data, label, delay }) {
    const [ready, setReady] = useState(() => {
        if (!delay) {
            return true
        } else {
            return false
        }
    })
    setTimeout(() => !ready ? setReady(true) : (() =>{})(), delay)

    
    const fill = useCallback((num, color, flip = 1, delay) => (element) => setTimeout(() => {
        if (!element) return;
        const numToDeg = numRes => 360*numRes / (data.standard.total + data.reliability.total)
        const setFill = (degr) => {
            if (degr < 180) {
                element.style.backgroundImage = `linear-gradient(${flip*90}deg, transparent 50%, ${color} 50%)`
                const mask = `linear-gradient(${flip*(degr + 90)}deg, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 50%)`
                element.style.WebkitMaskImage = mask
                element.style.maskImage = mask
            } else {
                const mask = `none`
                element.style.backgroundImage = `linear-gradient(${flip*(90 + degr)}deg, ${color} 50%, transparent 50%),  linear-gradient(${flip*90}deg, transparent 50%, ${color} 50%)` 
                element.style.WebkitMaskImage = mask
                element.style.maskImage = mask
            }
        }
        let deg = 0
        const end = numToDeg(num)
        const increment = end / 60
        let lastTimeStamp = 0
        const animationStep = (timeStamp) => {
            if (timeStamp === lastTimeStamp) return
            lastTimeStamp = timeStamp
            deg = deg + increment
            if (deg < end) {
                setFill(deg)
                window.requestAnimationFrame(animationStep)
            } else {
                setFill(end)
            } 
        }
        window.requestAnimationFrame(animationStep)
    }, delay))

    if (!ready) return <div className={styles.wrapper}></div>
    return (
        <div className={styles.wrapper}>
            <div ref={fill(data.standard.total + data.reliability.total, scssVariables.grey, 1, 0)} className={styles.dounut}>
                <div ref={fill(data.standard.total, scssVariables.grey, 1, 0)} className={styles.standard}></div>
                <div ref={fill(data.reliability.total, scssVariables.darkGrey, -1, 0)} className={styles.reliability}></div>
                <div ref={fill(data.standard.completed, scssVariables.blue, 1, 1000)} className={styles.completed}></div>
                <div ref={fill(data.reliability.completed, scssVariables.darkBlue, -1, 1000)} className={styles.completed}></div>
            </div>
            <label className={styles.label}>{label}</label>
        </div>
        
    )
}

export default PieChart