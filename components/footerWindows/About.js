import styles from "./About.module.scss"
import PopUp from "../PopUp"

function About({onClose}) {
  return (
    <PopUp onClose={onClose} header="about">
      <div className={styles.wrapper}>
        <div>
          <div>Why</div>
          <div>The applicaton was develepoed to be used for the 2022 ICCS-project</div>
        </div>
        <div>
          <div>When</div>
          <div>Develpoment was startedin July and ended in August of 2022</div>
        </div>
        <div>
          <div>What</div>
          <div>This is an application developed to keep track when a team is coding surveys.</div>
        </div>
      </div>
    </PopUp>

  )
}

export default About