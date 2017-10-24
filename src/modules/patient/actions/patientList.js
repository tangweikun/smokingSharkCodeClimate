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
// const queryPatientBySearchTerm = gql`
//   query QueryPatientBySearchTerm($inputValue: String) {
//     patients(filter: { name_contains: $inputValue }) {
//       _id
//       nickname
//       gender
//       dateOfBirth
//       avatar
//       startOfIllness
//       diabetesType
//     }
//   }
// `
export default queryPatients
