import { getWildcardFromTwitter } from './twitter'
import { sampleWildcard } from './mongodb'
import config from './config' // keys for twitter API

const mongodb = require('mongodb')

function sampleTwitter() {
  try {
    const daysBack = 5
    getWildcardFromTwitter('pickuplines', 1, daysBack, (result) => {
      if (result) {
        console.log('FOUND TWEET: ', result)
      } else {
        console.error('ERROR: unable to get tweet.')
      }
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
        result = await sampleWildcard(db, 'icebreaker_wildcard')
        console.log('FOUND MONGODB: ', result)
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

sampleTwitter()
sampleMongoDB()
