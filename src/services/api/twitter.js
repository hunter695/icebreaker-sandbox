// const express = require('express')
import config from './config' // keys for twitter API
import { getPastDate } from './utility'

const twit = require('twit') // module for interacting with Twitter API

const T = twit(config.twitter)

module.exports = {
  /**
   * Primary function for populating wildcard database.
   * @param {string} content A string such as 'pickupline(s)' or 'icebreaker(s)'
   * @param {number} amount How many tweets you want back.
   * @param {string} daysBack how far back to get tweets
   * @param {requestCallback} callback Runs after successful Twitter API call,
   * with an object containing information from tweet passed to it.
   */
  async getWildcardFromTwitter(content, amount, daysBack, callback) {
    let tweet
    let result
    const date = await getPastDate(daysBack)
    // console.log(date)
    const params = {
      q: `#${content} since:${date}`,
      lang: 'en',
      result_type: 'recent',
      count: amount,
    }
    T.get('search/tweets', params, (twitterError, data, response) => {
      tweet = data.statuses
      // console.log(`TWITTER RESPONSE: ${response.statusCode}`)
      if (response.statusCode !== 200 || (Array.isArray(tweet) && tweet.length === 0)) {
        callback(null)
      } else {
        result = {
          text: tweet[0].text,
          author: tweet[0].user.screen_name,
          retweet_count: tweet[0].retweet_count,
          source: tweet[0].source,
        }
        callback(result)
      }
    })
  },
}
