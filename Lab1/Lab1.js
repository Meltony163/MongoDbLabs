//1- Create a Database named "ITI_Mongo". 
use ITI_Mongo

//2-Create a Collection named "Staff". 
db.createCollection("Staff")

//3-Insert one document into the "Staff" collection: {_id, name, age, gender, department}. 
db.Staff.insertOne({
    "_id":1,
    "name":"Eltony",
    "age":25,
    "gender":"male",
    "department":"AI"
})

/*4-Insert many documents into the "Staff" collection: 

   Object: {_id, name, age: 20, gender: "male", department} 

   Object: {_id, name, age: 25, gender: "female", managerName, department} 

   Object: {_id, name, age: 15, gender, DOB} */

db.Staff.insertMany([
{
    "_id":2,
    "name":"abdeltawab",
    "age":20,
    "gender":"male",
    "department":"OS"
},
{
    "_id":3,
    "name":"sara",
    "age":25,
    "gender":"female",
    "department":"DS",
    "managerName":"Moamen"
},
{
    "_id":4,
    "name":"Mohamed",
    "age":15,
    "gender":"male",
    "DOB":"2009-05-10"
}
])
   
//5-Query to find data from the "Staff" collection: 
//5.1-Find all documents. 
db.Staff.find({})

//5.2-Find documents where gender is "male". 
db.Staff.find({"gender":"male"})
//5.3-Find documents with age between 20 and 25  
db.Staff.find({"age":
{
    $gte:20,
    $lte:25
}})

//5.4-Find documents where age is 25 and gender is "female".
db.Staff.find({
    "age":25,
    "gender":"female"
    })

//5.5-Find documents where age is 20 or gender is "female"
db.Staff.find({
    "age":20,
    "gender":"female"
    })

//6-Update one document in the "Staff" collection where age is 15, set the name to "your name". 
db.Staff.find({"age":15})
db.Staff.updateOne({"age":15},{$set:{"name":"Moamen"}})
db.Staff.find({"age":15})

//7-Update many documents in the "Staff" collection, update the department to "AI". 
db.Staff.find({})
db.Staff.updateMany({},{$set:{"department":"AI"}})
db.Staff.find({})

//8-Create a new collection called "test" and insert documents from Question 4. 
db.test.insertMany([
{
    "_id":2,
    "name":"abdeltawab",
    "age":20,
    "gender":"male",
    "department":"OS"
},
{
    "_id":3,
    "name":"sara",
    "age":25,
    "gender":"female",
    "department":"DS",
    "managerName":"Moamen"
},
{
    "_id":4,
    "name":"Mohamed",
    "age":15,
    "gender":"male",
    "DOB":"2009-05-10"
}
])
db.test.find({})

//9-Try to delete one document from the "test" collection where age is 15. 
db.test.find({"age":15})
db.test.deleteOne({"age":15})
db.test.find({"age":15})
//9-a With justification, explain which document will be deleted if more than one has age = 15. (Try it.) 
// deletes the first document that matches the filter
//9-b First insert: db.collection.insertOne({ _id: 5, name: "ahmed", age: 15 }) 
db.test.insertOne({ _id: 5, name: "ahmed", age: 15 })
//9-c Second insert: db.collection.insertOne({ _id: 6, name: "eman", age: 15 }) 
db.test.insertOne({ _id: 6, name: "eman", age: 15 })
//9-d When you run deleteOne, will it delete ahmed or eman? 
db.test.deleteOne({"age":15})
db.test.find({"age":15})
//ahmed deleted

//10- try to delete all male gender
db.test.insertOne({
    "_id":1,
    "name":"Eltony",
    "age":25,
    "gender":"male",
    "department":"AI"
}) 
db.test.find({'gender':'male'})
db.test.deleteMany({'gender':'male'})
db.test.find({'gender':'male'})

//11-Try to delete all documents in the "test" collection. 
db.test.find({})
db.test.deleteMany({})
db.test.find({})


   
   