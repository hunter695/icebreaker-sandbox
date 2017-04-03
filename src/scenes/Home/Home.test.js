import React from 'react'
import renderer from 'react-test-renderer'
import Home from './'

describe('<Home />', () => {
  it('renders initial UI', () => {
    const tree = renderer.create(<Home />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
