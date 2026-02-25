# MongoDB Mastery: ITI Labs

This repository contains solutions for three MongoDB labs, focusing on the transition from basic document manipulation to advanced aggregation and database administration.

---

## 📂 Lab 1: CRUD Fundamentals
* **Data Entry**: Practiced `insertOne` and `insertMany` using varied data structures including nested objects and optional fields.
* **Query Logic**: Implemented filters using `$gt`, `$lt`, `$and`, and `$or`.
* **Update Operations**: Utilized `updateOne` and `updateMany` for targeted and global field modifications.
* **Deletion Mechanics**: Explored the behavior of `deleteOne` vs `deleteMany`. 

---

## 📂 Lab 2: Advanced Operators & Aggregation
* **Array Queries**: Leveraged `$exists`, `$all`, and `$size` to query complex array structures.
* **Upsert & Conditional Updates**: 
    * Used `upsert` to handle "update-or-insert" logic.
    * Employed `$setOnInsert` to initialize fields only during document creation.
* **Field Calculators**: Applied atomic operators `$inc`, `$mul`, `$min`, and `$max` for high-performance numeric updates.
* **Aggregation Framework**: 
    * Engineered multi-stage pipelines to calculate total revenue (`Sum(Qty * Price)`) with date-range filtering.
    * Generated statistical summaries including averages, minimums, and maximums across grouped data.



---

## 📂 Lab 3: Validation & Performance
* **Schema Validation**: Enforced data integrity using `$jsonSchema` to define required fields, data types, and value constraints (enums/ranges).
* **Indexing & Optimization**: 
    * Created **Single Field** and **Compound Indexes** to improve query efficiency.
    * **Performance Analysis**: Utilized `.explain()` to analyze execution plans, comparing **COLLSCAN** (Collection Scan) vs. **IXSCAN** (Index Scan).



---

## 🏆 Bonus: Backup & Recovery
* **Database Migration**: 
    * **Backup**: Utilized CLI tools to dump the database to a local directory.
    * **Restore**: Successfully restored the data into a new database instance with a modified name.

---

## 🛠 Tools Used
* **Database**: MongoDB
* **GUI**: Robo 3T (Studio 3T)
* **CLI Tools**: `mongodump`, `mongorestore`