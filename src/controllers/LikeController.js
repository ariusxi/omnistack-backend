const Dev = require('../models/Dev')

class LikeController {

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

            if (targetDev.likes.includes(loggedDev._id)){
                console.log('Match')
            }

            loggedDev.likes.push(targetDev._id)

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

module.exports = new LikeController()