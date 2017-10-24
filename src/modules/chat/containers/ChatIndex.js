import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import get from 'lodash/get'
import ChatMessage from './ChatMessage'
import ChatView from './ChatView'
import PatientDetails from '../../patient/containers/PatientDetails'
import { setActivePatient } from '../../left-nav/actions/patientList'

class ChatIndex extends React.Component {
  componentWillMount() {
    const patientId = get(this.props, 'match.params.patientId')
    if (patientId) this.props.setActivePatient(patientId)
  }
  componentWillReceiveProps(np) {
    const nextPatientId = get(np, 'match.params.patientId')
    const thisPatientId = get(this.props, 'match.params.patientId')
    if (nextPatientId !== thisPatientId) {
      this.props.setActivePatient(nextPatientId)
    }
  }
  render() {
    const patientId = this.props.match.params.patientId
    return (
      <Wrapper>
        <ChatMessage {...this.props} />
        {patientId ? <ChatView patientId={patientId} /> : null}
        {patientId ? <PatientDetails patientId={patientId} /> : null}
      </Wrapper>
    )
  }
}

ChatIndex.propTypes = {
  match: PropTypes.object.isRequired,
  setActivePatient: PropTypes.func,
}

export default connect(null, { setActivePatient })(ChatIndex)

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`
