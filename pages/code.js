import styles from './code.module.scss'
import getAccount from "../database/actions/getAccount"
import getActiveBatch from '../database/actions/getActiveBatch'
import getResponsesInBatch from '../database/actions/getResponsesInBatch'
import SmallResponseCard from '../components/SmallResponseCard'
import CreateNewBatch from '../components/CreateNewBatch'
import ResponseCoder from '../components/ResponseCoder'
import NewResponse from '../components/NewResponse'
import { v4 as uuid} from 'uuid'
import { useRouter } from 'next/router'
import Link from 'next/link'

const Code = ({ batch, responses }) => {
    const router = useRouter()
    const { _id } = router.query

    const content = () => {
        if (!batch) return <CreateNewBatch />
        if (responses.every(res => res.pending === false)) return <NewResponse />
        if (!_id) return <div>Please select a response on the left</div>
        const activeResponse = responses.find(res => res._id === _id)
        if (!activeResponse) return <div>{_id} is not a response in your current batch</div>
        return <ResponseCoder response={activeResponse} />
    }
    let response
    if (!_id) {
        response = null
    } else {
        response = responses.find(res => res._id === _id) 
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.responsesList}>
                {responses.map(res => 
                    <div key={uuid()} className={`${styles.responseCard} ` + (res._id === _id ? `${styles.pending}` : '')}>
                        <Link href={`/code?_id=${res._id}`}>link</Link>
                        <SmallResponseCard r={res.r} studentId={res.studentId} booklet={res.booklet} pending={res.pending} />
                    </div>
                )}   
            </div>
            <div className={styles.content}>
                {
                    content()
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const account = await getAccount(context.req.cookies.code_jwt)
    const activeBatch = await getActiveBatch(account._id).then(batch => {
        if (!batch) return null
        return {
            _id: batch._id.toString()
        }
    })
    const responses = await getResponsesInBatch(activeBatch?._id).then(resArr => {
        return resArr.map(res => {
            return {
                _id: res._id.toString(),
                studentId: res.studentId,
                booklet: res.booklet,
                pending: res.pending,
                r: account.team === res.team ? false : true
            }
        })
    })

    return { props: { batch: activeBatch, responses: responses } }
}

export default Code