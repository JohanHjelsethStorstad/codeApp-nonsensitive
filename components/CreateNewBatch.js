import styles from './CreateNewBatch.module.scss'
import axios from 'axios'
import { useState } from 'react'

function CreateNewBatch() {
    const [error, setError] = useState()

    const handleCreateNewBatch = () => {
        axios.post('/api/createBatch').then(res => {
            location.href = './code'
        }).catch(err => {
            console.log(err.response)
            setError(err.response.data.error)
        })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.text}>
                You do not currently have an active batch of responses. To continue
                coding you must create a new batch. 
                Before proceeding, make sure that previous batches are delivered.
            </div>
            <button onClick={handleCreateNewBatch} className={styles.btn}>create new batch</button>
            <div className={styles.error}>{error}</div>
        </div>

    )
}

export default CreateNewBatch