import { graphql, compose } from 'react-apollo'
import Layer from '../components/PatientDetails'
import queryPatientById from '../actions/profile'

export default compose(
  graphql(queryPatientById, {
    variables: props => ({
      patientId: props.patientId,
    }),
  }),
)(Layer)
