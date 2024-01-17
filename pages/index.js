import PieCharts from "../components/home/PieCharts"
import getStats from "../database/actions/getStats"
import styles from './index.module.scss'
import ProgressHistories from "../components/home/ProgressHistories"
import Front from "../components/home/Front"
import { useCallback } from "react"

const Home = ({ teamStats, total, progress, progressHistory }) => {
    const scaleHistory = useCallback(node => {
        if (!node) return
        const observer = new ResizeObserver(() => {
            const element = document.getElementById('progressHistory')
            if (!element) return;
            element.style.transform = `scale(${node.offsetWidth / element.offsetWidth})`
        })
        observer.observe(node)
    
        return () => observer.disconnect()
    })

    return (
        <div className={styles.wrapper}>
            <div ref={scaleHistory}  className={styles.pieCharts}>
                <PieCharts a={teamStats.a} b={teamStats.b} />
            </div>  
            <div className={styles.front}>
                <Front left={{a: total.a - progress.a.reliability - progress.a.standard, b: total.b - progress.b.reliability - progress.b.standard}}/>
            </div>      
            <div id='progressHistory' style={{transformOrigin: 'top left'}} className={styles.progressHistory}>
                <ProgressHistories total={ total } progressHistory={ progressHistory } />
            </div>
        </div>
    )
}

export async function getServerSideProps(context) { 
    const {  teamStats, total, progress , progressHistory  } = await getStats()
    return { props: { teamStats, total, progress, progressHistory } }
}

export default Home