import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { graphql } from 'react-apollo'
// import isEqual from 'lodash/isEqual'
import get from 'lodash/get'
import ChatViewComponent from '../components/ChatView'
import { queryMessages, updateChatRoom, closeChatWindow, fetchMoreMessages } from '../actions'
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
    data: PropTypes.object.isRequired,
    patientId: PropTypes.string.isRequired,
    // userId: PropTypes.string.isRequired,
    // subscribeToNewFeedback: PropTypes.func.isRequired,
    // messages: PropTypes.array.isRequired,
  }

  static scrollToBottom = (patientId) => {
    const messageWallDiv = document.getElementById(`message-wall-${patientId}`)
    messageWallDiv.scrollTop = messageWallDiv.scrollHeight
  }

  state = { messages: [] }

  // componentWillMount() {
  //   this.props.subscribeToNewFeedback()
  // }

  componentDidMount() {
    if (this.props.patientId) {
      ChatView.scrollToBottom(this.props.patientId)
      const wall = document.getElementById(`message-wall-${this.props.patientId}`)
      wall.addEventListener('scroll', this.incrementalScroll, false)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading) {
      let messages = get(nextProps.data, 'fetchOrCreateNeedleChatRoom.messages', [])
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
    const chatRoomId = get(this.props.data, 'fetchOrCreateNeedleChatRoom._id')
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

// export default connect(mapStateToProps, { closeChatWindow })(withLoading(ChatView))

export default connect(null, { updateChatRoom, closeChatWindow, fetchMoreMessages })(
  graphql(queryMessages, {
    options: props => ({
      variables: {
        patientId: props.patientId,
        before: new Date(),
      },
      pollInterval: 5000,
    }),
  })(ChatView),
)
