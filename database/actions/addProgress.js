import Progress from '../models/Progress'
import getStats from './getStats'

const addProgress = () => {
    if (!global.progressInterval) {
        console.log('adding interval for progress history')
        global.progressInterval = setInterval(async () => {
          const { progress } = await getStats()
          const newProgress = await Progress.create(progress)
          console.log('progress snapshot taken:')
          console.log(newProgress)
        }, 1000*60*60*3)
    }
}

export default addProgress