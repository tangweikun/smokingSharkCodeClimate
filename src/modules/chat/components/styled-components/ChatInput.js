import styled from 'styled-components'
import { Icon, Input } from 'antd'

export const ChatInputContainer = styled.div`
  flex-shrink: 0;
  width: 100%;
  height: 72px;
  padding: 4px;
  border-top: 1px solid ${props => props.theme.general.color.BORDER};
`

export const ChatButtonsContainer = styled.div`margin-top: 8px;`

export const ChatInput = styled(Input)`border: none !important;`
export const ChatAdditionButton = styled(Icon)`
  padding: 4px;
  font-size: ${props => props.theme.general.size.LITTLE_LARGER};
  cursor: pointer;
  &:hover {
    background-color: #eee;
  }
`

export const EmojiTable = styled.div`
  width: 192px;
  height: 300px;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  justify-content: space-around;
  overflow-y: auto;
  font-size: 20px;
`

export const EmojiButton = styled.img`
  width: 28px;
  height: 28px;
  margin: 1px 2px;
  cursor: pointer;
  border-radius: 2px;
  &:hover {
    background-color: #eee;
  }
`
