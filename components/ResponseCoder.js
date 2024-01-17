import styles from './ResponseCoder.module.scss'
import axios from 'axios'
import { useState, useEffect } from 'react'

function ResponseCoder({ response }) {
  const [error, setError] = useState('')
  
  useEffect(() => { //Sørger for at erroret forsvinner når responsen byttes
    setError('')
  }, [response])

  const handleResponseDone = (e) => {
    e.preventDefault()
    axios.post('/api/responseDone', {
      responseId: response._id
    }).then(res =>{
      location.reload()
    }).catch(err => {
      setError(err.response.data.error)
    })
  }
  const copyId = () => {
    navigator.clipboard.writeText(response.studentId)
    document.querySelector('.'+styles.confirmCopy).innerHTML = 'ID copied'
    setTimeout(() => document.querySelector('.'+styles.confirmCopy).innerHTML = '', 3000)
  }
  return (
    <div className={styles.wrapper}>
      <div className={styles.controls}>
        <div className={styles.info}>
          <table>
            <tr>
              <th>StudentID</th>
              <td>{response.studentId}</td>
            </tr>
            <tr>
              <th>Booklet</th>
              <td>{response.booklet}</td>
            </tr>
            <tr>
              <th>Reliability</th>
              <td>{response.r ? 'yes' : 'no'}</td>
            </tr>
            <tr>
              <th>done</th>
              <td>{response.pending ? 'no' : 'yes'}</td>
            </tr>
          </table>
        </div>
        <div className={styles.control}>
          <div className={styles.error}>{error}</div>
          <button className={`${styles.btn} ` + (response.pending ? '' : `${styles.grey}`)} onClick={handleResponseDone}>Response Done</button> 
          <button onClick={copyId} className={styles.copy}>copy student id</button>
          <div className={styles.confirmCopy}></div>
        </div>
      </div>
    </div>
  )
}

export default ResponseCoder