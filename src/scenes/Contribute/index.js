import React from 'react'
import styled from 'styled-components'
import AndroidInput from 'components/AndroidInput'
import Button from 'components/Button'

const Main = styled.main`
  display: flex;
  justify-content: center;
`

const Submission = styled.div`
  display: flex;
  flex-basis: 75%;
`

const Contribute = () => (
  <Main>
    <Submission>
      <AndroidInput placeholder="Type in your icebreaker"></AndroidInput>
      <Button style={{ marginLeft: '16px' }}>Submit</Button>
    </Submission>
  </Main>
)

Contribute.propTypes = {

}

export default Contribute
