import styles from './SmallResponseCard.module.scss'

function SmallResponseCard({studentId, booklet, pending, r}) {
  return (
    <div className={`${styles.wrapper} ` + (pending ? `${styles.pending}` : '')}>
        <div>{studentId}</div>
        <div>B{booklet}</div>
        <div className={styles.r}>{r ? 'R': ''}</div>
    </div>
  )
}

export default SmallResponseCard