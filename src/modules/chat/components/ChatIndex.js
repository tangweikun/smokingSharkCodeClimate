import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'

import ChatMessage from '../containers/ChatMessage'
import ChatView from '../containers/ChatView'
import PatientDetails from '../../patient/containers/PatientDetails'

const ChatIndex = (props) => {
  const patientId = props.match.params.patientId
  return (
    <Wrapper>
      <ChatMessage {...props} />
      {patientId ? <ChatView patientId={patientId} /> : null}
      {patientId ? <PatientDetails patientId={patientId} /> : null}
    </Wrapper>
  )
}

ChatIndex.propTypes = {
  match: PropTypes.object.isRequired,
}

export default ChatIndex

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`
