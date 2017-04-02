import config from './config' // keys for twitter API

const mongodb = require('mongodb')
const parse = require('csv-parse')
const fs = require('fs')
const path = require('path')

module.exports = {
  /**
   * Randomly samples a document from 'wildcard' database.
   * @param {db} content Database from MongoDB connection
   * @param {requestCallback} callback Function used to process each document retrieved
   */
  sampleWildcard(db, callback) {
    return new Promise((resolve, reject) => {
      const cursor = db.collection('wildcard')
      .aggregate([{ $sample: { size: 1 } }])
      cursor.each((err, doc) => {
        if (doc) {
          resolve(doc)
        } else {
          callback()
          reject('Unable to get a document.')
        }
      })
    })
  },
  /**
   * Parses csv file calling parse_file() and store into MongoDB
   * @param {string} col MongoDB collection name to insert into.
   * @param {string} filePath is the path to the csv file.
   */
  storeCurated(col, filePath) {
    const mongodbURL = config.mongodb.url
    const MongoClient = mongodb.MongoClient
    // connect to MongoDB
    MongoClient.connect(mongodbURL, (mongodbError, db) => {
      if (mongodbError) {
        throw Error(`Unable to connect, error: ${mongodbError}`)
      } else {
      // parse csv files
        const list = []
        const storelines = []
        // array 'list' contains one row of all entries in pairs
        const parser = parse({ delimiter: ',' }, (err, data) => {
          if (err) {
            throw Error(`File ${filePath} parsing error: ${err}`)
          } else {
            list.push(data)
            const row = list[0]
            // gets list with pickupline and author
            for (let i = 1; i < list[0].length; i += 1) {
              storelines.push({
                text: row[i][0],
                author: row[i][1],
                likes: 0,
                dislikes: 0 })
            }
          }
          // store formated array of pickup lines into Mongo
          const collection = db.collection(col)
          collection.insert(storelines, (insertError) => {
            // console.log(`DB insert result: ${records.ops[0]._id}`)
            if (insertError) {
              throw Error(`insert error: ${insertError}`)
            }
            db.close()
          })
        })
        // streams from csv location while parsing is busy
        fs.createReadStream(path.join('../../../', filePath)).pipe(parser)
      }
    })
  },
}
