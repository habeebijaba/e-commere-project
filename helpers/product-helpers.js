var db = require('../configurations/connection');
var bcrypt = require('bcrypt');
var collection = require('../configurations/collections');
const { response } = require('../app');
var objectId = require('mongodb').ObjectId
module.exports = {
    addProduct: (data) => {
        return new Promise((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTION).insertOne(data).then((response) => {
                console.log(response);
                resolve(response)

            })
        })
    },
    deleteProduct:(id)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(id)}).then((response)=>{
                resolve()
            })
        })
    },
    getAllProducts:()=>{
        return new Promise(async(resolve,reject)=>{
           let allProducts= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
           resolve(allProducts)
        })
    },
    getProductDetails:(id)=>{
        return new Promise((resolve,reject)=>{
             db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(id)}).then((response)=>{
                    resolve(response)
            })
        })
    }























}