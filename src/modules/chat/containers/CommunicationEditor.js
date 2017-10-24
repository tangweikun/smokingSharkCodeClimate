import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import Component from '../components/CommunicationEditor'
import { closeModal } from '../../modal/reducers'
import {
  queryClosestAppointment,
  saveCommunication as saveCommunicationRecord,
  queryAllCommunications,
} from '../actions/graphql'

const saveCommunication = props => (dispatch) => {
  const { patientId, form, mutationSave, record } = props
  form.validateFields((err, values) => {
    const nextDate = values.nextDate ? values.nextDate.toISOString() : null
    const nextTopic = values.nextTopic || ''
    const _id = record ? record._id : null
    const variables = { ...values, patientId, nextDate, nextTopic, _id }
    mutationSave({
      variables,
      refetchQueries: [
        {
          query: queryAllCommunications,
          variables: {
            patientId,
          },
        },
      ],
    }).then((result) => {
      if (result.data.saveCommunication) {
        dispatch(closeModal())
      }
    })
  })
}

const mapStateToProps = state => ({
  patientId: state.core.activedPatient.patientId,
})

export default compose(
  connect(mapStateToProps, { closeModal, saveCommunication }),
  graphql(queryClosestAppointment, {
    options: props => ({
      variables: {
        patientId: props.patientId,
      },
    }),
  }),
  graphql(saveCommunicationRecord, { name: 'mutationSave' }),
)(Component)
