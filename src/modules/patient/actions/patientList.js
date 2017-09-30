import { gql } from 'react-apollo'

const queryPatients = gql`
  query GetAllPatients {
    patients {
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
export default queryPatients
