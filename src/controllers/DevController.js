const axios = require('axios')

const Dev = require('../models/Dev')

class DevController {

    async index(req, res) {
        try{
            const { user } = req.headers

            const loggedDev = await Dev.findById(user)

            const users = await Dev.find({
                $and: [
                    { _id: { $ne: user } },
                    { _id: { $nin: loggedDev.likes } },
                    { _id: { $nin: loggedDev.dislikes } }
                ]
            })

            return res.json({
                success: true,
                data: users
            })
        }catch(e){
            res.json({
                success: false,
                data: e
            })
        }
    }

    async store(req, res) {
        try{
            const { username } = req.body

            const userExists = await Dev.findOne({
                username: username
            })

            if(userExists){
                return res.json({
                    success: true,
                    data: userExists
                })
            }

            const response = await axios.get(`https://api.github.com/users/${username}`)

            const { name, bio, avatar_url: avatar } = response.data

            const dev = await Dev.create({
                name: name,
                username: username,
                bio: bio,
                avatar: avatar
            })

            return res.json({
                success: true,
                data: dev
            })
        }catch(e){
            res.json({
                success: false,
                data: e
            })
        }
    }

}

module.exports = new DevController()