import styles from './NewResponse.module.scss'
import axios from 'axios'
import { useRef, useState, useCallback } from 'react'
import Switch from './Switch.js'

function NewResponse() {
  const bookletSelected = useRef()
  const onlyR = useRef()
  const [newResponseError, setNewResponseError] = useState()
  const [batchDoneError, setBatchDoneError] = useState()

  //SELECTS SAME AS LAST TIME
  const setLastTime = useCallback((node) => {
    let lastTime = localStorage.getItem('bookletSelected')
    if (!node) return
    bookletSelected.current = lastTime
    node.value = lastTime
  })

  const handleNewResponse = e => {
    e.preventDefault()
    axios.post('/api/newResponse', {
      booklet: bookletSelected.current,
      onlyR: onlyR.current
    }).then(res => {
      location.href = `/code?_id=${res.data.response._id}`
    }).catch(err => {
      console.log(err)
      setNewResponseError(err.response.data.error)
    })
    
  }
  const handleBatchDone = e => {
    e.preventDefault()
    axios.patch('/api/batchDone')
    .then(res => {
      location.href = '/code'
    }).catch(err => {
      setBatchDoneError(err.response.data.error)
    })
    
  }
  const handleBookletChange = (e) => {
    e.preventDefault()
    bookletSelected.current = e.target.value
    localStorage.setItem('bookletSelected', bookletSelected.current)
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.newResponse}>
        <div className={styles.header}>Get a new response</div> 
        <div className={styles.text}>you have no responses left - do you want a new one?</div>
        <div className={styles.text}>Select the booklet you want to code</div>
        <form className={styles.form}>
          <select ref={setLastTime} onChange={handleBookletChange} className={styles.bookletSelection}>
            <option value={1}>B1</option>
            <option value={2}>B2</option>
            <option value={3}>B3</option>
            <option value={4}>B4</option>
            <option value={5}>B5</option>
            <option value={6}>B6</option>
            <option value={7}>B7</option>
            <option value={8}>B8</option>
          </select>
          <div className={styles.onlyR}>
            <div>only reliability</div>
            <Switch referance={onlyR} />
          </div>

          <button onClick={handleNewResponse} className={styles.btn}>new response</button>
          <div className={styles.error}>{newResponseError}</div>
        </form>
      </div>
      <div className={styles.done}>
        <div className={styles.header}>Mark batch as done</div>
        <div className={styles.text}>Please remember to deliver the DME file right away.</div>
        <button onClick={handleBatchDone} className={styles.btn}>Mark as done</button>
        <div className={styles.error}>{batchDoneError}</div>
      </div>
    </div>
  )
}

export default NewResponse