import styles from "./ContactInfo.module.scss"
import PopUp from "../PopUp"

function ContactInfo({onClose}) {
  return (
    <PopUp header="contact us" onClose={onClose}>
      <div className={styles.contact}>
        <div>
          <div>Oddveig Storstad</div>
          <div>førsteamanuensis</div>
          <div>Nasjonal forskningskoordinator</div>
        </div>
        <div>
          <div>oddveig.storstad@ntnu.no</div>
          <div>73591901</div>
          <div>48119497</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <div>Joacim Caspersen</div>
          <div>forskningssjef</div>
          <div>datamanager</div>
        </div>
        <div>
          <div>joakim.caspersen@samforsk.no</div>
          <div>99019380</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <div>Ingrid Holmedahl Hermstad</div>
          <div>forsker 3</div>
        </div>
        <div>
          <div>ingrid.hermstad@samforsk.no</div>
          <div>99407866</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <div>Melina Røe</div>
          <div>seniorforsker</div>
          <div>skolekontakt</div>
        </div>
        <div>
          <div>melina.roe@samforsk.no</div>
          <div>99012545</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <div>Ida Utmo</div>
          <div>forsker 3</div>
          <div>forskningsassistent</div>
        </div>
        <div>
          <div>ida.utmo@samforsk.no</div>
          <div>48030857</div>
        </div>
      </div>
      <div className={styles.contact}>
        <div>
          <div>Christian Wendelborg</div>
          <div>forsker 1</div>
          <div>samplingskoordinator</div>
        </div>
        <div>
          <div>Christian.Wendelborg@samforsk.no</div>
          <div>91106644</div>
        </div>
      </div>
    </PopUp>
  )
}

export default ContactInfo
