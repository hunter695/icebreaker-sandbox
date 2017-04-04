import { getWildcardFromTwitter } from './twitter'

function twitterWildcardSample() {
  try {
    const daysBack = 5
    getWildcardFromTwitter('pickuplines', 1, daysBack, (result) => {
      if (result) {
        console.log('FOUND TWEET: \n', result)
      } else {
        console.error('ERROR: unable to get tweet.')
      }
    })
  } catch (err) {
    console.error(err)
  }
}

twitterWildcardSample()
