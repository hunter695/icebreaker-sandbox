module.exports = {
  /**
   * Randomly samples a document from 'wildcard' database.
   * @param {Object} db Database from MongoDB connection
   * @param {requestCallback} callback Function used to process each document retrieved
   */
  sampleWildcard(db, callback) {
    return new Promise((resolve, reject) => {
      if (!db) {
        reject('Invalid database.')
      }
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
   * Randomly samples a document from 'wildcard' database.
   * @param {Object} db Database from MongoDB connection
   * @param {string} callback collection name for database.
   * @param {Object} id of document to update.
   * @param {Integer} amount of likes to increment
   */
  addLikes(db, col, id, amount, callback) {
    db.collection(col).update({ _id: id }, { $inc: { likes: amount } })
    callback()
  },
  /**
   * Randomly samples a document from 'wildcard' database.
   * @param {Object} db Database from MongoDB connection
   * @param {string} callback collection name for database.
   * @param {Object} id of document to update.
   * @param {Integer} amount of likes to increment
   */
  addDislikes(db, col, id, amount, callback) {
    db.collection(col).update({ _id: id }, { $inc: { dislikes: amount } })
    callback()
  },
  /**
   * Stores tweets into MongoDB database 'wildcard'
   * @param {Object[]} tweets Array of tweets in JSON
   * @param {string} collectionToInsert MongoDB collection to store in.
   */
  store(db, col, tweet) {
    // console.log('DB connected successfully')
    db.collection(col).insert(tweet, (insertError) => {
      // console.log(`DB insert result: ${records.ops[0]._id}`)
      if (insertError) {
        throw new Error(`insert error: ${insertError}`)
      }
      db.close()
    })
  },
}
