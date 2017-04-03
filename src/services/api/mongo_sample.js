import { addLikes, addDislikes } from './mongodb'
import config from './config' // keys for twitter API

const mongodb = require('mongodb')
const mongodbURL = config.mongodb.url
const MongoClient = mongodb.MongoClient
// storeCurated('pickuplines_curated', 'csv/pickuplines_sample.csv')

async function insertGarbage(db) {
  let result
  try {
    result = await db.collection('wildcard')
    .insertOne({
      text: 'tasty meatloaf',
      author: 'Gordon Ramsay',
      likes: 2,
      dislikes: 123,
    })
  } catch (e) {
    throw Error(e)
  }
  console.log('Inserted document: ', result.ops[0])
  return result.insertedId
}

MongoClient.connect(mongodbURL, async (err, db) => {
  const id = await insertGarbage(db)
  addLikes(db, 'wildcard', id, 2)
  addDislikes(db, 'wildcard', id, 100)
  const updatedDoc = await db.collection('wildcard').findOne({ _id: id }, {})
  console.log()
  console.log('Updated document: ', updatedDoc)
  db.close()
})
