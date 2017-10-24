import { gql } from 'react-apollo'

export const saveCommunication = gql`
  mutation saveCommunication(
    $_id: ID
    $patientId: ID!
    $currentTopic: String!
    $initiator: Roles!
    $method: Method!
    $nextTopic: String
    $nextDate: Date
  ) {
    saveCommunication(
      _id: $_id
      patientId: $patientId
      currentTopic: $currentTopic
      initiator: $initiator
      method: $method
      nextTopic: $nextTopic
      nextDate: $nextDate
    )
  }
`

export const queryClosestAppointment = gql`
  query patient($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      closestAppointment {
        _id
        appointmentTime
      }
    }
  }
`

export const queryAllCommunications = gql`
  query patient($patientId: ID!) {
    patient(patientId: $patientId) {
      _id
      communications {
        _id
        currentTopic
        createdAt
        nextTopic
        nextDate
        initiator
        method
      }
    }
  }
`
