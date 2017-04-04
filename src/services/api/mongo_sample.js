import { addLikes, addDislikes, store } from './mongodb'
import config from './config' // keys for twitter API

const mongodb = require('mongodb')
const mongodbURL = config.mongodb.url
const MongoClient = mongodb.MongoClient

async function insertGarbage(db) {
  let result
  try {
    result = await db.collection('test')
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
  if (!db) {
    console.error('ERROR: please start your mongod service.')
  } else {
    try {
      const id = await insertGarbage(db)
      addLikes(db, 'test', id, 2, async () => {
        try {
          const updatedDoc = await db.collection('test').findOne({ _id: id }, {})
          console.log()
          console.log('Updated document: ', updatedDoc)
        } catch (findErr) {
          console.error(findErr)
        }
      })
      addDislikes(db, 'test', id, 100, async () => {
        try {
          const updatedDoc = await db.collection('test').findOne({ _id: id }, {})
          console.log()
          console.log('Updated document: ', updatedDoc)
        } catch (findErr) {
          console.error(findErr)
        }
      })
    } catch (updateErr) {
      console.error(updateErr)
    }
    // storing document
    const content = {
      text: 'asdsad',
      author: '123',
      likes: 1,
      dislikes: 3,
    }
    store(db, 'test', content)
    db.close()
  }
})
