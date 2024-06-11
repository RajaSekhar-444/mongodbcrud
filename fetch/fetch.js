const express=require('express')
let mongodb = require('mongodb')

const url = require('../url')
//create mongoclient
let mcl=mongodb.MongoClient
//Cteate router
let router=express.Router()
//create rest api
router.get('/',(req,res)=>{
    mcl.connect(url,(err,conn)=>{
        if(err){
            console.log('Error occurred in connection')
        }
        else{
            let db=conn.db('nodedb')
            db.collection('products').find().toArray((err,arr)=>{
                if(err){
                    console.log("Error occurred in collection ",err)
                }
                else{
                    console.log('Data Sent')
                    res.json(arr)
                    conn.close()
                }
            })
        }
    })
})

//export router
module.exports = router
