import styles from './AccountCard.module.scss'
import Image from 'next/image'

function AccountCard({name, _id, admin, team, numberCoded, id}) {
    let image = require(`../images/default.jpeg`)
    const extTypes = ['jpg', 'jpeg', 'png'] 
    for (let x of extTypes) {
        try {
        } catch {

        }
    } 
    return (
        <div className={styles.wrapper}>
            <div className={styles.name}>
                <div>{name}</div>
            </div>
            <div className={styles.image}>
                <Image width={200} objectFit="contain" src={image} alt="profile picture" />
            </div>
            <div className={styles.info}>
                <div className={styles.infoItem}>
                    <div>id</div>
                    <div>{id}</div>
                </div>
                <div className={styles.infoItem}>
                    <div>role</div>
                    <div>{admin ? 'administrator':'coder'}</div>
                </div>
                <div className={styles.infoItem}>
                    <div>team</div>
                    <div>{team}</div>
                </div>
                <div className={styles.infoItem}>
                    <div>Responses coded</div>
                    <div>{numberCoded}</div>
                </div>
            </div>
        </div>
    )
}

export default AccountCard