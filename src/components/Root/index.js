import React, { PropTypes } from 'react'
import styled from 'styled-components'
import 'normalize.css'
import Header from './components/Header'

const MaxHeight = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: linear-gradient(-180deg, #3cf 26%, #72e6e2 91%);
`

const Content = styled.main`
  flex: 1;
`

const Root = (props) => (
  <MaxHeight>
    <Header />
    <Content>{props.children}</Content>
  </MaxHeight>
)

Root.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Root
