import { connect } from 'react-redux'
import { graphql } from 'react-apollo'
import ChatView from '../containers/ChatView'
import { queryMessages, messageAdded, subscriptionMessage } from '../actions'

const mapStateToProps = state => ({
  userId: state.core.userInfo._id,
})

const withData = graphql(queryMessages, {
  name: 'MessageList',
  options: props => ({
    variables: {
      patientId: props.patientId,
      before: new Date(),
    },
  }),
  props: props => ({
    subscribeToNewFeedback: () => props.MessageList.subscribeToMore({
      document: subscriptionMessage,
      updateQuery: (prev, { subscriptionData }) => {
        console.log('Prev: ', prev)
        // const prevChatRoomId = prev.patient.boundDetails.chatRoom._id
        // if (!subscriptionData.data
        //     || prevChatRoomId !== subscriptionData.data.chatMessageAdded.chatRoom._id) {
        //   return prev
        // }
        const newFeedbackItem = subscriptionData.data.chatMessageAdded
        console.log('New Feedback Item', newFeedbackItem)
        const newMessage = {
          sender: props.ownProps.userId === newFeedbackItem.sender._id ? 'self' : 'others',
          type: newFeedbackItem.__typename,
          createdAt: newFeedbackItem.createdAt,
        }
        switch (newFeedbackItem.__typename) {
          case 'TextMessage':
            newMessage.text = newFeedbackItem.text
            break
          case 'ImageMessage':
            newMessage.imageUrl = newFeedbackItem.imageUrl
            break
          case 'AudioMessage':
            newMessage.audioUrl = newFeedbackItem.audioUrl
            break
          default:
            newMessage.text = newFeedbackItem.text
        }
        return props.ownProps.messageAdded(props.ownProps.patientId, newMessage)
      },
    }),
  }),
})

// export default connect(mapStateToProps)(ChatView)

export default connect(mapStateToProps, { messageAdded })(withData(ChatView))
