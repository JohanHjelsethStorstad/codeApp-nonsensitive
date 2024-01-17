import dbConnect from '../dbConnect'
import Progress from '../models/Progress'
import Response from '../models/Response'
import addProgress from './addProgress'

const getStats = async () => {
    addProgress()
    await dbConnect()
    const getTeamStats = async (team) => {
        const otherTeam = team === 'A' ? 'B' : 'A'

        const ret = {
            standard: {
                total: 0,
                completed: 0
            }, 
            reliability: {
                total: 0,
                completed: 0
            }
        }
        ret.standard.total = await Response.find({team: team}).count()
        ret.standard.completed = await Response.find({team: team})
                                    .find({
                                        $or: [
                                            {batch: {$size: 1}},
                                            {batch: {$size: 2}}
                                        ]
                                    }).find({pending: false}).count()
        ret.reliability.total = await Response.find({team: otherTeam}).find({reliability: true}).count()
        ret.reliability.completed = await Response.find({team: otherTeam}).find({reliability: true})
                                    .find({batch: {$size: 2}}).find({pending: false}).count()
        return ret
    }
    const teamStats = {}
    teamStats.a = await getTeamStats('A')
    teamStats.b = await getTeamStats('B')
    const progress = {
        a: {
            standard: teamStats.a.standard.completed,
            reliability: teamStats.a.reliability.completed 
        },
        b: {
            standard: teamStats.b.standard.completed,
            reliability: teamStats.b.reliability.completed 
        }
    }
    const total = {
        a: teamStats.a.standard.total + teamStats.a.reliability.total ,
        b: teamStats.b.standard.total  + teamStats.b.reliability.total 
    }
    const progressHistory = await Progress.find({}).sort({createdAt: -1}).limit(40).then(arr => {
        arr = arr.map(prog => {return {
            a:{...prog.a},
            b:{...prog.b},
            time: JSON.parse(JSON.stringify(prog.createdAt))
        }})
        return arr.reverse()
    })

    return { teamStats, progress, total, progressHistory }
}

export default getStats