import { getWildcardFromTwitter } from './twitter'
import { sampleWildcard } from './mongodb'
import config from './config' // keys for twitter API

const mongodb = require('mongodb')

function sampleTwitter() {
  try {
    const daysBack = 5
    getWildcardFromTwitter('pickuplines', 1, daysBack, (result) => {
      console.log(result)
    })
  } catch (err) {
    console.error(err)
  }
}

function sampleMongoDB() {
  try {
    let result
    mongodb.MongoClient.connect(config.mongodb.url, async (err, db) => {
      try {
        result = await sampleWildcard(db, () => {
          db.close()
        })
        console.log(`RESULT TEXT: ${result.text}`)
      } catch (findErr) {
        console.log(findErr)
      }
    })
  } catch (err) {
    throw Error('Unable to connect to MongoDB')
  }
}

sampleTwitter()
sampleMongoDB()
