import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const CommunicationButton = ({ popupEditor }) => (
  <BorderLessButton icon="plus-circle-o" onClick={popupEditor}>
    添加记录
  </BorderLessButton>
)

CommunicationButton.propTypes = {
  popupEditor: PropTypes.func,
}

export default CommunicationButton

const BorderLessButton = styled(Button)`border: none;`
