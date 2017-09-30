import { gql } from 'react-apollo'

// import React from 'react'

export const openChatRoom = () =>
  (dispatch, getState) => {
    const { patientId } = getState().core.activedPatient
    dispatch({
      type: 'OPEN_CHAT_WINDOW',
      patientId,
    })
  }


const queryPatientById = gql`
  query GetActivedPatientProfile ($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      nickname
      gender
      dateOfBirth
      avatar
      startOfIllness
      diabetesType
    }
  }
`
export default queryPatientById
