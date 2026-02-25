//1-Provide the MongoDB code for enforcing JSON schema validation when creating a collection named "employees"
// with required fields "name," "age" (min. 18), and "department" (limited to ["HR," "Engineering," "Finance"]). 
use ITI_Mongo

db.runCommand({collMod:"employees",
               validator:{$jsonSchema:{
                   bsonType:"object",
                   required:["name","age","department"],
                   properties:{
                       "age":{
                          bsonType:"int",
                          minimum:18 ,
                          description:"age must be int greater than 18"
                       },
                       "department":{
                           bsonType:"string",
                           "enum":["HR", "Engineering","Finance"],
                           description:'department (limited to ["HR," "Engineering," "Finance"])'
                       }
                   }
               }}})
               
db.employees.insertOne({"age":17,"department":"AI"})              
               
//2-reate new Database named Demo  And Collections named trainningCenter1, trainningCenter2  
               
use Demo

db.createCollection("trainningCenter1")
db.createCollection("trainningCenter2")

//2.a-Insert documents into trainningCenter1 collection contains (Use Variable named data as Array) 
//_id , name as firstName lastName , age , address, status as array  

var data = [{"_id":1,"name":{"firstName":"Moamen","lastName":"Eltony"},"age":23,"address":"portsaid","status":["ok","ok"]},
{"_id":2,"name":{"firstName":"Mohamed","lastName":"Eltony"},"age":30,"address":"portsaid","status":["nok","ok"]},
{"_id":3,"name":{"firstName":"Mohamed","lastName":"abdeltawab"},"age":50,"address":"portsaid","status":["nok","nok"]}]

//2.b Using insert ONE from data Variable 
db.trainningcenter1.insertOne(data)

db.trainningcenter1.find({})

//2.c Using Same Variable (data) with same data and insert MANY into trainningCenter2 collection 
db.trainningcenter2.insertMany(data)

db.trainningcenter2.find({})
              
//3-use find. explain function (find by age field) and mention scanning type 
db.trainningcenter2.find({"age":30}).explain()  //"stage" : "COLLSCAN"

//4-Create index on created collection named it “IX_age” on age field  
db.trainningcenter2.createIndex({"age":1},{name:"IX_age"})

//5-Use find. explain view winning plan for index created (find by age field) and mention scanning type 
db.trainningcenter2.find({"age":30}).explain()//"stage" : "IXSCAN" it searched by index

//6-Create index on created collection named it “compound” on firstNsme and lastName 
//6.a-Try find().explain before create index and mention scanning type 
db.trainningcenter2.find({"name.firstName":"Moamen","name.lastName":"Eltony"}).explain()//"stage" : "COLLSCAN"

//6.b=Try find().explain after create index and mention scanning type 
db.trainningcenter2.createIndex({"name.firstName":1,"name.lastName":1})
db.trainningcenter2.find({"name.firstName":"Moamen","name.lastName":"Eltony"}).explain()//"stage" : "IXSCAN"

//7-Drop Demo Database 
use Demo
db.dropDatabase()

/*8-Bonus Part 

Use mongodump to back up your Lab database. 

Drop the Lab database. 

Use mongorestore to restore it with a new name: ITI_Course
*/
use ITI_Mongo

db.dropDatabase()
               
               