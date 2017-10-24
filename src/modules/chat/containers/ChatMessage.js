import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { graphql, compose } from 'react-apollo'
import get from 'lodash/get'
import ChatMessageComponent from '../components/ChatMessage'
import { queryLatestMessages, updateLastSeenAt } from '../actions/chatView'

const mapStateToProps = state => ({
  latestMessageList: state.chat.latestMessageList,
})

class ChatMessage extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    history: PropTypes.object,
    mutationUpdateLastSeenAt: PropTypes.func.isRequired,
  }
  state = {}
  render() {
    const { patients, loading } = this.props.data
    const history = this.props.history
    const patientList = patients ? patients.filter(patient => !!patient.needleChatRoom) : []
    const filteredPatients = loading ? [] : patientList
    const activePatient = get(this.props, 'match.params.patientId')
    return (
      <ChatMessageComponent
        patients={filteredPatients}
        activePatient={activePatient}
        history={history}
        updateLastSeenAt={this.props.mutationUpdateLastSeenAt}
      />
    )
  }
}

export default compose(
  graphql(queryLatestMessages, {
    options: () => ({
      variables: {
        userId: '66728d10dc75bc6a43052036',
      },
      // pollInterval: 10000,
    }),
  }),
  graphql(updateLastSeenAt, { name: 'mutationUpdateLastSeenAt' }),
  connect(mapStateToProps),
)(ChatMessage)
