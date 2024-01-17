import styles from './Front.module.scss'

function Front({left}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.total}>
        <div className={styles.text}>
          Responses left to code:
        </div>
        <div className={styles.number}>
          {left.a + left.b}
        </div> 
      </div>
      <div className={styles.a}>
        <div className={styles.text}>
          Team A responses left to code:
        </div>
        <div className={styles.number}>
          {left.a}
        </div> 
      </div>
      <div className={styles.b}>
        <div className={styles.text}>
          Team B responses left to code:
        </div>
        <div className={styles.number}>
          {left.b}
        </div> 
      </div>
    </div>
  )
}

export default Front