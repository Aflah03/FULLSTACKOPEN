const bcrypt = require('bcrypt')
const User = require('../models/user')
const {test, describe, beforeEach} = require('node:test')
const api = require('api')
const assert = require('node:assert')
const { application } = require('express')


describe('when ther is initally one user in db', ()=>{
    beforeEach(async()=>{
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user  = new User({username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeds with a fresh username', async ()=>{
        const userAtStart = await helper.usersInDb()

        const newUser = {
            'username': 'nihal',
            name:'Mohammed Nihal',
            password:'0000'
        }
        await api 
        .post
    })

})