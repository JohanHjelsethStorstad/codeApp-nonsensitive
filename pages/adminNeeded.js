import styles from './serverError.module.scss'

const AdminNeeded = () => {
    return (
        <div className={styles.wrapper}>You are not an aministrator</div>
    )
}

export default AdminNeeded