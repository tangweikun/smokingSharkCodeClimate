import styled from 'styled-components'
import React from 'react'
import PropTypes from 'prop-types'
import PatientList from './PatientList'
// import EmptyScreen from './EmptyScreen'

const PatientIndex = (props) => {
  const patientId = props.match.params.patientId
  return (
    <Wrapper>
      <PatientList {...props} patientId={patientId} />
    </Wrapper>
  )
}
PatientIndex.propTypes = {
  match: PropTypes.object.isRequired,
}
export default PatientIndex

const Wrapper = styled.div`
  display: flex;
  flex: 1;
`
