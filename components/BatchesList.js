import { v4 as uuid } from 'uuid'
import styles from './BatchesList.module.scss'
import SmallResponseCard from './SmallResponseCard'

function BatchesList({batches}) {
  //MAKES THE DATING EASY TO WORK WITH
  const getDate = date => {
    let x = date.toString().split('T').join(',').split('-').join(',').split(',')
    return (
      <>
        <div className={styles.day}>{x[2]}.</div>
        <div className={styles.month}>{x[1]}.</div>
        <div className={styles.year}>{x[0]}&nbsp;</div>
        <div className={styles.time}>{x[3].slice(0,5)}</div>
      </>
    )
  }

  return (
    <div className={styles.wrapper}>
    {
      batches.map(batch => 
      <div key={uuid()} className={`${styles.batch} ` + (batch.active ? `${styles.light}` : '')}>
        <div className={styles.active}>{batch.active ? 'active' : 'completed'}</div>
        <div className={styles.number}>{batch.number}</div>
        <div className={styles.numberResponses}>{batch.numberResponses} {batch.numberResponses === 1 ? 'response' : 'responses'}</div>
        <div className={styles.createdAt}>
          <div className={styles.timeHead}>created at</div>
          <div className={styles.date}>
            {getDate(batch.createdAt)}
          </div>
        </div>
        <div className={styles.finishedAt}>
          {
            batch.finishedAt ? (<>
              <div className={styles.timeHead}>finished at</div>
              <div className={styles.date}>
                {getDate(batch.finishedAt)}
              </div>
            </>) : (<></>)
          }
        </div>
        <div className={styles.responses}>
        {
          batch.responses.map(response => 
            <SmallResponseCard key={uuid()} {...response} />
          )
        }
        </div>
      </div>
      )
    }
    </div>
  )
}

export default BatchesList