const Dev = require('../models/Dev')

class DislikeController {

    async store(req, res) {
        try{
            const { user } = req.headers
            const { devId } = req.params

            const loggedDev = await Dev.findById(user)
            const targetDev = await Dev.findById(devId)

            if (!targetDev) {
                return res.status(400).json({
                    success: false,
                    message: 'Dev does not exists'
                })
            }

            loggedDev.dislikes.push(targetDev._id)

            await loggedDev.save()

            return res.json({
                success: true,
                data: loggedDev
            })
        }catch(e){
            return res.json({
                success: false,
                data: e
            })
        }
    }

}

module.exports = new DislikeController()