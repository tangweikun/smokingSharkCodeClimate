import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import { Badge } from 'antd'
import {
  ChatMessagePanel,
  ChatMessageItem,
  ChatMessageAvatar,
  UserName,
  ChatMessageDate,
  ChatMessageBrief,
  InfoWrapper,
  NameLine,
} from './styled-components'

const ChatMessage = ({ patients, history, updateLastSeenAt, activePatient }) => {
  const choosePatient = (patient) => {
    console.log(patient)
    const chatRoomId = patient.needleChatRoom._id
    updateLastSeenAt({
      variables: {
        chatRoomId,
        userId: '66728d10dc75bc6a43052036',
      },
    })
    history.push(`/chat/${patient._id}`)
  }
  return (
    <ChatMessagePanel>
      {isEmpty(patients) ||
        patients.map((o) => {
          const latestMessage = get(o, 'needleChatRoom.latestMessage') || {}
          const unreadMessageCount = get(o, 'needleChatRoom.unreadMessageCount', 0)
          const format = moment(latestMessage.createdAt).isSame(moment(), 'day')
            ? 'HH:mm'
            : 'YYYY-MM-DD HH:mm'
          return (
            <ChatMessageItem
              key={o._id}
              onClick={() => choosePatient(o)}
              selected={activePatient === o._id}
            >
              <ChatMessageAvatar src={o.avatar} />
              <InfoWrapper>
                <NameLine>
                  <UserName>{o.nickname}</UserName>
                  <Badge count={unreadMessageCount} />
                  <ChatMessageDate>
                    {moment(latestMessage.createdAt).format(format)}
                  </ChatMessageDate>
                </NameLine>
                <ChatMessageBrief>{latestMessage.text}</ChatMessageBrief>
              </InfoWrapper>
            </ChatMessageItem>
          )
        })}
    </ChatMessagePanel>
  )
}

ChatMessage.propTypes = {
  patients: PropTypes.array.isRequired,
  history: PropTypes.object,
  updateLastSeenAt: PropTypes.func.isRequired,
  activePatient: PropTypes.string,
}

export default ChatMessage
