import React, { PropTypes } from 'react'
import { Popover } from 'antd'
import { StyIncomingMessageButton, StyBadge } from './styled-components'
import ChatMessage from '../containers/ChatMessage'

const IncomingMessageButton = ({ count }) => (
  <StyBadge count={count}>
    <Popover trigger="click" placement="bottomLeft" content={<ChatMessage />}>
      <StyIncomingMessageButton type="message" />
    </Popover>
  </StyBadge>
)
IncomingMessageButton.propTypes = {
  count: PropTypes.number.isRequired,
}

export default IncomingMessageButton
