import styles from './ProgressHistories.module.scss'
import ProgressHistory from './ProgressHistory'
import { v4 as uuid } from 'uuid'

function ProgressHistories({ progressHistory, total }) {
    const progressA = progressHistory.map(x => ({
        ...x.a,
        time: x.time
    }))
    const progressB = progressHistory.map(x => ({
        ...x.b,
        time: x.time
    }))
    const progressTotal = progressHistory.map(x => ({
        standard: x.a.standard + x.b.standard,
        reliability: x.a.reliability + x.b.reliability,
        time: x.time
    }))
    total.total = total.a + total.b

    return (
        <div  className={styles.wrapper}>
            <div className={styles.total}>
                 <ProgressHistory label='total' key={uuid()} total={total.total} data={progressTotal} large/>
            </div>
            <div className={styles.a}>
                <ProgressHistory label='team A' key={uuid()} total={total.a} data={progressA}/>
            </div>
            <div className={styles.b}>
                <ProgressHistory label='team B' key={uuid()} total={total.b} data={progressB}/>
            </div>      
        </div>
    )
}

export default ProgressHistories