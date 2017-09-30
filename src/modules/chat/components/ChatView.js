import React, { PropTypes } from 'react'
import isEmpty from 'lodash/isEmpty'
import ChatBubble from '../containers/ChatBubble'
import ChatInput from '../containers/ChatInput'
import { ChatViewPanel, MessageWall } from './styled-components'

const ChatView = ({ messages, chatRoomId, patientId }) => (
  <ChatViewPanel>
    <MessageWall id={`message-wall-${patientId}`}>
      {isEmpty(messages) ||
        messages.map(message => <ChatBubble key={message._id} message={message} />)}
    </MessageWall>
    <ChatInput chatRoomId={chatRoomId} patientId={patientId} />
  </ChatViewPanel>
)

ChatView.propTypes = {
  messages: PropTypes.array,
  chatRoomId: PropTypes.string,
  patientId: PropTypes.string.isRequired,
}

export default ChatView
