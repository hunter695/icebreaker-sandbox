import { daysAgo } from './utility'
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

it('Should be string', () => {
  const date = daysAgo() // aWeekAgo returns a promise.
  return chai.expect(date).to.eventually.exist
})
