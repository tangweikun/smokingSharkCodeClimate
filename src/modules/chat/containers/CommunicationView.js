import { connect } from 'react-redux'
import { graphql, compose, gql } from 'react-apollo'
import Component from '../components/CommunicationView'
import { popupEditor } from '../actions'
import { queryAllCommunications } from '../actions/graphql'

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, { popupEditor }),
  graphql(queryAllCommunications, {
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
)(Component)
