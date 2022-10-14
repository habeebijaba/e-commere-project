var db = require('../configurations/connection');
var bcrypt = require('bcrypt');
var collection=require('../configurations/collections');
const { response } = require('../app');
var objectId=require('mongodb').ObjectId
module.exports = {

    adminLogin:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            let user=await db.get().collection(collection.ADMIN_COLLECTION).findOne({email:data.email})
            if(user){
                bcrypt.compare(data.password,user.password).then((status)=>{
                    if(status){
                        console.log('success');
                        response.status=true
                        response.admin=user
                        resolve(response)
                    }else{
                        console.log('password icorrect');
                        resolve({status:false})
                    }
                })
            }else{
                console.log(' email not exist');
                resolve({status:false})
            }
            
        })
    },
    getAllUsers:()=>{
            return new Promise(async (resolve, reject) => {
                let allUsers = await db.get().collection(collection.USER_COLLECTION).find().toArray()
                resolve(allUsers)
            })

    },
    blockUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(id)},{
                $set:{
                isBlocked:true
            }
            }).then((response)=>{
                console.log(response);
                resolve(response)
            })
           

        })

    },
    unblockUser:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).updateOne({_id:objectId(id)},{
                $set:{
                    isBlocked:false
                }
            }).then((response)=>{
                resolve(response)
            })
        })
    }










}