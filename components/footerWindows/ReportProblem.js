import styles from "./ReportProblem.module.scss"
import Input from "../Input"
import PopUp from "../PopUp"
import { useRef, useState } from 'react'
import axios from "axios"

function ReportProblem({onClose}) {
  const email = useRef() 
  const feedback = useRef()
  const [emailError, setEmailError] = useState("")
  const [feedbackError, setfeedbackError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleFeedbackChange = (e) => {
    e.preventDefault()
    feedback.current = e.target.value
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('/api/feedback', {
      email: email.current,
      feedback: feedback.current
    }).then(res => {
      setSuccess(true)
      setEmailError('')
      setfeedbackError('')
      setTimeout(() => setSuccess(false), 3000)
    }).catch(err => {
      const emailError = err.response.data.email
      const feedbackError = err.response.data.feedback
      setEmailError(emailError)
      setfeedbackError(feedbackError)
    })
  }
  return (
    <PopUp header="report a problem" onClose={onClose}>
      <div className={styles.wrapper}>
        <div>All feedback is greatly appreciated</div>
        <form>
          <Input error={emailError} referance={email} name="email" />
          <div>
            <textarea onChange={handleFeedbackChange} className={`${styles.feedbackBox} ` + (feedbackError ? `${styles.red}` : '')} name="feedback"/>
            {feedbackError ? <div className={styles.error}>{feedbackError}</div> : <></>}
          </div>
          <div>
            <button onClick={handleSubmit}>submit</button>
            <div className={`${styles.success} ` + (success ? `${styles.show}` : '')}>Success</div>
          </div>
        </form>
      </div>
    </PopUp>
  )
}

export default ReportProblem