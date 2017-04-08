import { sampleWildcard, addLikes, addDislikes, store } from './mongodb'
import config from './config' // keys for twitter API

const mongodb = require('mongodb')
const mongodbURL = config.mongodb.url
const MongoClient = mongodb.MongoClient

// This program uses collection 'test' in your MongoDB 'icebreaker' database.

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
  console.log('Inserted document: \n', result.ops[0])
  return result.insertedId
}

function mongoDbWildcardSample() {
  try {
    let result
    mongodb.MongoClient.connect(config.mongodb.url, async (err, db) => {
      try {
        result = await sampleWildcard(db, 'test')
        console.log('WILDCARD RANDOM SAMPLE: \n', result)
      } catch (findErr) {
        console.error(findErr)
      } finally {
        if (db !== null) {
          db.close()
        }
      }
    })
  } catch (err) {
    console.error(err)
  }
}

function likesDislikesSample() {
  MongoClient.connect(mongodbURL, async (err, db) => {
    if (!db) {
      console.error('ERROR: please start your mongod service.')
    } else {
      try {
        // try to insert garbage data and update its likes and dislikes
        const id = await insertGarbage(db)
        const likesWriteResult = await addLikes(db, 'test', id, 2)
        console.log('MongoDB write result: ', likesWriteResult.result)
        try {
          const updatedDoc = await db.collection('test').findOne({ _id: id }, {})
          console.log('Updated document: \n', updatedDoc)
        } catch (findErr) {
          console.error(findErr)
        }
        const dislikesWriteResult = await addDislikes(db, 'test', id, 100)
        console.log('MongoDB write result: ', dislikesWriteResult.result)
        try {
          const updatedDoc = await db.collection('test').findOne({ _id: id }, {})
          console.log('Updated document: \n', updatedDoc)
        } catch (findErr) {
          console.error(findErr)
        }
      } catch (updateErr) {
        console.error(updateErr)
      }
      // store some document
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
}

likesDislikesSample()
mongoDbWildcardSample()
