import React from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'antd'
import { isEmpty, find } from 'lodash'
import { Message, Content, ArrowWrapper, ArrowShape, Avatar40, Emoji } from './styled-components'
import EMOJI_MAP from '../constants/emoji'

export const Arrow = ({ direction }) => (
  <ArrowWrapper direction={direction}>
    <ArrowShape direction={direction} />
  </ArrowWrapper>
)

Arrow.propTypes = {
  direction: PropTypes.string.isRequired,
}

const directionMap = {
  self: 'right',
  others: 'left',
}

export const ChatBubble = ({ message, openImage }) => (
  <Message sender={message.sender}>
    <Avatar40 src={message.avatar} />
    <Arrow direction={directionMap[message.sender]} />
    <Content sender={message.sender}>
      {(() => {
        switch (message.type) {
          case 'TextMessage':
            return <MessageTranslator message={message.text} />
          case 'ImageMessage':
            return (
              <img
                alt="img"
                width="85"
                style={{ cursor: 'pointer' }}
                src={message.imageUrl}
                onClick={() => openImage(message.imageUrl)}
              />
            )
          case 'AudioMessage': {
            return (
              <Icon
                type="sound"
                style={{ cursor: 'pointer' }}
                onClick={() => new Audio(message.audioUrl).play()}
              />
            )
          }
          default:
            return message.text
        }
      })()}
    </Content>
  </Message>
)

ChatBubble.propTypes = {
  message: PropTypes.object.isRequired,
  openImage: PropTypes.func.isRequired,
}

const MessageTranslator = ({ message }) => {
  if (isEmpty(message) || isEmpty(message.trim())) {
    return <div />
  }

  const emojiRegexp = /\[[^[\]]+?\]/g
  const emojiKeys = message.match(emojiRegexp)
  if (isEmpty(emojiKeys)) {
    return <div>{message}</div>
  }

  const textContents = ` ${message} `.split(emojiRegexp)
  const contents = []
  textContents.forEach((text, index) => {
    contents.push(<span>{text.trim()}</span>)
    const emojiKey = emojiKeys[index]
    if (emojiKey) {
      const emoji = find(EMOJI_MAP, { key: emojiKey })
      contents.push(emoji ? <Emoji alt={emoji.key} src={emoji.value} /> : <span>{emojiKey}</span>)
    }
  })

  return <div>{contents}</div>
}

MessageTranslator.propTypes = {
  message: PropTypes.string.isRequired,
}

export default ChatBubble
