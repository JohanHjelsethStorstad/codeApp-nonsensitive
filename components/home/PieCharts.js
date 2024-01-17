import styles from './PieCharts.module.scss'
import PieChart from './PieChart'

function PieCharts( { a, b } ) {

    const total = {
        standard: {
            completed: a.standard.completed + b.standard.completed,
            total: a.standard.total + b.standard.total
        },
        reliability: {
            completed: a.reliability.completed + b.reliability.completed,
            total: a.reliability.total + b.reliability.total
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.total}>
                <PieChart data={total} label='total' />
            </div>
            <div className={styles.a}>
                <PieChart data={a} label='A' delay={2000}/>
            </div>
            <div className={styles.b}>
                <PieChart data={b} label='B' delay={2000}/>
            </div>      
        </div>
    )
}

export default PieCharts