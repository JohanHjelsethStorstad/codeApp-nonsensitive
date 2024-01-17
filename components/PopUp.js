import styles from "./PopUp.module.scss"

function PopUp({color, header, onClose, children}) {
  return (
    <div style={color ? {backgroundColor: color} : {}} className={styles.wrapper}>
        <div className={styles.header}>{header}</div>
        <button onClick={onClose} className={styles.close} />
        <div className={styles.content}>
            {children}
        </div>
    </div>
  )
}

export default PopUp