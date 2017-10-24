// import { connect } from 'react-redux'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql, compose } from 'react-apollo'
// import isEqual from 'lodash/isEqual'
// import update from 'immutability-helper'
import get from 'lodash/get'
import ChatViewComponent from '../components/ChatView'
import { queryMessages, subscriptionMessage } from '../actions'
// import { withLoading } from '../../../common/withLoading'

// const mapStateToProps = (state, props) => ({
// messages: state.chat.patients[props.patientId].messages,
// chatRoomName: state.chat.patients[props.patientId].chatRoomName,
// chatRoomId: state.chat.patients[props.patientId].chatRoomId,
// userId: state.core.userInfo._id,
// })

class ChatView extends Component {
  static propTypes = {
    // updateChatRoom: PropTypes.func.isRequired,
    // fetchMoreMessages: PropTypes.func.isRequired,
    // data: PropTypes.object.isRequired,
    patientId: PropTypes.string.isRequired,
    // userId: PropTypes.string.isRequired,
    subscribeToNewFeedback: PropTypes.func.isRequired,
    MessageList: PropTypes.object.isRequired,
  }

  static scrollToBottom = (patientId) => {
    const messageWallDiv = document.getElementById(`message-wall-${patientId}`)
    messageWallDiv.scrollTop = messageWallDiv.scrollHeight
  }

  state = { messages: [] }

  componentWillMount() {
    this.props.subscribeToNewFeedback()
  }

  componentDidMount() {
    if (this.props.patientId) {
      ChatView.scrollToBottom(this.props.patientId)
      const wall = document.getElementById(`message-wall-${this.props.patientId}`)
      wall.addEventListener('scroll', this.incrementalScroll, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.MessageList.loading) {
      let messages = get(nextProps.MessageList, 'fetchOrCreateNeedleChatRoom.messages', [])
      messages = messages.map(message => ({
        ...message,
        sender: message.sender._id === '66728d10dc75bc6a43052036' ? 'self' : 'others',
        avatar: message.sender.avatar,
      }))
      this.setState({ messages })
    }
  }

  componentWillUpdate() {
    const wall = document.getElementById(`message-wall-${this.props.patientId}`)
    this.shouldScrollBottom = wall.scrollTop + wall.offsetHeight === wall.scrollHeight
    this.scrollHeight = wall.scrollHeight
    this.scrollTop = wall.scrollTop
  }

  componentDidUpdate() {
    if (this.props.patientId) {
      const wall = document.getElementById(`message-wall-${this.props.patientId}`)
      ChatView.scrollToBottom(this.props.patientId)
      if (this.shouldScrollBottom) {
        wall.scrollTop = wall.scrollHeight
      }
      if (this.scrollTop === 0) {
        wall.scrollTop = this.scrollTop + (wall.scrollHeight - this.scrollHeight)
      }
    }
  }

  // incrementalScroll = () => {
  //   const wall = document.getElementById(`message-wall-${this.props.patientId}`)
  //   if (wall.scrollTop === 0 && !this.state.isLoading) {
  //     this.props.data.fetchMore({
  //       query: queryMessages,
  //       variables: {
  //         patientId: this.props.patientId,
  //         before: this.props.messages[0].createdAt,
  //       },
  //       updateQuery: (previousResult, { fetchMoreResult }) => {
  //         if (!fetchMoreResult) {
  //           return previousResult
  //         }
  //         const fetchMessages = get(fetchMoreResult, 'patient.boundDetails.chatRoom.messages')
  //         if (fetchMessages.length === 0) {
  //           this.setState({ isLoading: true })
  //         }
  //         const messages = fetchMessages.map((message) => {
  //           const historyMessage = {
  //             sender: this.props.userId === message.sender._id ? 'self' : 'others',
  //             type: message.__typename,
  //             avatar: message.sender.avatar,
  //             createdAt: message.createdAt,
  //           }
  //           switch (message.__typename) {
  //             case 'TextMessage':
  //               historyMessage.text = message.text
  //               break
  //             case 'ImageMessage':
  //               historyMessage.imageUrl = message.imageUrl
  //               break
  //             case 'AudioMessage':
  //               historyMessage.audioUrl = message.audioUrl
  //               break
  //             default:
  //               historyMessage.text = message.text
  //           }
  //           return historyMessage
  //         })
  //         return this.props.fetchMoreMessages(this.props.patientId, messages)
  //       },
  //     })
  //   }
  // }

  render() {
    const chatRoomId = get(this.props.MessageList
, 'fetchOrCreateNeedleChatRoom._id')
    return (
      <ChatViewComponent
        chatRoomId={chatRoomId}
        messages={this.state.messages}
        patientId={this.props.patientId}
        userId="66728d10dc75bc6a43052036"
      />
    )
  }
}

const withData = graphql(queryMessages, {
  name: 'MessageList',
  options: props => ({
    variables: {
      patientId: props.patientId,
      before: new Date(),
    },
  }),
  props: props => ({
    ...props,
    subscribeToNewFeedback: () => props.MessageList.subscribeToMore({
      document: subscriptionMessage,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.chatMessageAdded) {
          return prev
        }
        const newFeedbackItem = subscriptionData.data.chatMessageAdded
        console.log('New Feedback Item', newFeedbackItem)
        const newMessage = {
          ...newFeedbackItem,
        }
        switch (newFeedbackItem.__typename) {
          case 'NeedleTextMessage':
            newMessage.text = newFeedbackItem.text
            break
          case 'NeedleImageMessage':
            newMessage.imageUrl = newFeedbackItem.imageUrl
            break
          case 'NeedleAudioMessage':
            newMessage.audioUrl = newFeedbackItem.audioUrl
            break
          default:
            newMessage.text = newFeedbackItem.text
        }
        return {
          ...prev,
          fetchOrCreateNeedleChatRoom: {
            ...prev.fetchOrCreateNeedleChatRoom,
            messages: [...prev.fetchOrCreateNeedleChatRoom.messages, newMessage],
          },
        }
      },
    }),
  }),
})

export default compose(
  withData,
)(ChatView)
