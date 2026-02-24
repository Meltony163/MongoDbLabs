use ITI_Mongo

//1-Find documents where the "tags" field exists. 
db.inventory.find({"tags":{$exists:true}})

//2-Find documents where the "tags" field does not contain values "ssl" or "security." 
db.inventory.find({"tags":{$nin:['ssl','security']}})

//3-Find documents where the "qty" field is equal to 85. 
db.inventory.find({"qty":{$eq:85}})

//4-Find documents where the "tags" array contains all of the values [ssl, security] using the `$all` operator. 
db.inventory.find({"tags":{$all:['ssl','security']}})

//5-Find documents where the "tags" array has a size of 3. 
db.inventory.find({"tags":{$size:3}})

//6-Update the "item" field in the "paper" document, update "size.uom" to "meter" and using the `$currentDate` operator. 
db.inventory.find({$and:[{"size.uom":{$exists:true}},{"item":"paper"}]})

db.inventory.updateOne({$and:[{"size.uom":{$exists:true}},{"item":"paper"}]},
                       {$set:{"size.uom":"meter"}}
                        )
                        
db.inventory.find({$and:[{"size.uom":{$exists:true}},{"item":"paper"}]})

//6.a-Also, use the upsert option (within updateOne)and change filter condition item:”laptopDevice”. 
db.inventory.find({$and:[{"size.uom":{$exists:true}},{"item":"laptopDevice"}]})

db.inventory.updateOne({$and:[{"size.uom":{$exists:true}},{"item":"laptopDevice"}]},
                       {$set:{"size.uom":"meter"}},
                       {upsert:true})
                       
db.inventory.find({$and:[{"size.uom":{$exists:true}},{"item":"laptopDevice"}]})

//6.b-Use the $setOnInsert operator to add new data if an insert occurs. 
db.inventory.find({$and:[{"size.uom":"cm"},{"item":"laptopDevice"}]})

db.inventory.updateOne({$and:[{"size.uom":"cm"},{"item":"laptopDevice"}]},
                       {$set:{"code":"abc"},
                       $setOnInsert:{"InsertedOnUpdate":true}},
                       {upsert:true})

db.inventory.find({$and:[{"size.uom":"cm"},{"item":"laptopDevice"}]})

//6.c-Try using the updateMany operation. 
db.inventory.find({"time":{$exists:true}})

db.inventory.updateMany({},{$currentDate:{"time":true}})

db.inventory.find({"time":{$exists:true}})

//6.d-try using the `replaceOne` operation.
db.inventory.find({$and:[{"size.uom":"in"},{"item":"laptopDevice"}]}) 

db.inventory.replaceOne({$and:[{"size.uom":"in"},{"item":"laptopDevice"}]},
                        {"code":"ABC"})
                        
db.inventory.find({$and:[{"size.uom":"in"},{"item":"laptopDevice"}]})

db.inventory.find({"code":"ABC"})

//7-Insert a document with incorrect field names "neme" and "ege," then rename them to "name" and "age."
db.inventory.insertOne({"neme":"moamen","ege":25})

db.inventory.find({$and:[{"neme":{$exists:true}},{"ege":{$exists:true}}]})

db.inventory.updateOne({$and:[{"neme":{$exists:true}},{"ege":{$exists:true}}]},
                    {$rename:{"neme":"name","ege":"age"}} 
                     )

db.inventory.find({$and:[{"neme":{$exists:true}},{"ege":{$exists:true}}]})

//8-Try to reset any document field using the `$unset` function. 
db.inventory.find({$and:[{"name":{$exists:true}},{"age":{$exists:true}}]})

db.inventory.updateOne({$and:[{"name":{$exists:true}},{"age":{$exists:true}}]},
                    {$unset:{"name":""}} 
                     )

db.inventory.find({"age":{$exists:true}})

//9-Try update operators like `$inc`, `$min`, `$max`, and `$mul` to modify document fields. 
//9.1-Use $max on the field: salary 
db.employees.find({"name":"John Doe"})

db.employees.updateOne({"name":"John Doe"},
                       {$max:{"salary":60001}}
                        )

db.employees.find({"name":"John Doe"})

//9.2-Use $min on the field: overtime 
db.employees.updateMany({},
                       {$set:{"overtime":50}} 
                        )
                        
db.employees.find({"name":"John Doe"})

db.employees.updateOne({"name":"John Doe"},
                       {$min:{"overtime":51}}
                        )
                        
db.employees.find({"name":"John Doe"})

//9.3-Use $inc on the field: age 

db.employee.find({"fName":"mohamed"})

db.employee.updateOne({"fName":"mohamed"},
                       {$inc:{"age":15}}
                        )
                        
db.employee.find({"fName":"mohamed"})

//9.4-Use $mul on the fields: quantity and price 
db.orders.find({"_id":0})

db.orders.updateOne({"_id":0},
                    {$mul:{"price":1.5,
                            "quantity":2
                          }
                    })

db.orders.find({"_id":0})

/*10-Calculate the total revenue for product from sales collection documents
 within the date range '01-01-2020' to '01-01-2023' and then sort them in descending order by total revenue.*/
db.sales.updateMany({},
                [{$set:{"revenue":{$multiply:["$price","$quantity"]}}}]
                )
                
db.sales.aggregate([{$match:{"date":{$gte:ISODate('2020-01-01'),
                       $lte:ISODate('2023-01-01')}}},
                       {$group:{"_id":"$product","TotalRevenue":{$sum:"$revenue"}}},
                       {$sort:{"TotalRevenue":-1}}])

//11-Calculate the average salary for employees for each department from the employee’s collection.
db.employees.aggregate([{$group:{"_id":"$department","Average":{$avg:"$salary"}}}])

//12-Use likes Collection to calculate max and min likes per title 
db.likes.aggregate([{$group:{"_id":"$title","MaxLikes":{$max:"$likes"},"MinLikes":{$min:"$likes"}}}])











