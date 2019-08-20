const router = require('koa-router')()
const Redis = require('koa-redis')
const mongoose=require('mongoose');
const Person = require('../dbs/models/person')

const Store = new Redis().client

router.prefix('/article')

// const resSuccess = ({ ctx, message = '请求成功', result = null }) => {
// 	ctx.body = { code: 1, message, result }
// }

router.get('/', function (ctx, next) {
    ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
    ctx.body = 'this is a users/bar response'
})

router.get('/fix', async function (ctx) {
    const st = await Store.hset('fix', 'name', Math.random())
    ctx.body = {
        code: 0
    }
})

router.post('/add', async function (ctx) {
    console.log('params', new Date())
    let cbody = ctx.request.body;
    const person = new Person({
        title: cbody.title,
        url: cbody.url,
        description: cbody.description,
        keyword: cbody.keyword,
        tags: cbody.tags,
        content: cbody.content,
        createdAt: new Date()
    })
    let code,res;
    try {
        await person.save()
        code = 0;
        res = {}
    } catch (e) {
        code = -1,
        res = null;
    }
    ctx.body = {
        code: code,
        results: res
    }
})

router.post('/get', async function (ctx) {
    //   const result = await Person.findOne({name: ctx.request.body.name})
    try{
        let params = ctx.request.body.id ? {
            _id: mongoose.Types.ObjectId(ctx.request.body.id)
        } : {}
        const results = await Person.find(params)
        console.log('res', results)
        ctx.body = {
            code: 0,
            results
        }
    }catch(error){
        console.log('error',error)
    }
    
})

router.post('/update', async function (ctx) {
    const result = await Person.where({
        title: ctx.request.body.title
    }).update({
        url: ctx.request.body.url
    })
    ctx.body = {
        code: 0
    }
})

router.post('/remove', async function (ctx) {
    // const result = await Person.where({
    //     _id: ctx.request.body.id
    // }).remove()
    // const result = await 
    let result = Person.findByIdAndRemove(ctx.request.body.id).exec()
        .then(function (doc) {
            console.log('doc---',doc)
            return doc;
        }).catch(function (error) {
            console.log('error', error)
            throw error;
        });

    ctx.body = {
        code: 0,
        results: result
    }
})


module.exports = router