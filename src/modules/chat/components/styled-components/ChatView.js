import styled from 'styled-components'

export const ChatViewPanel = styled.div`
  flex: 0 0 420px;
  margin-left: 2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: #fff;
`

export const MessageWall = styled.div`
  height: 100%;
  flex: 1 1 auto;
  padding: 0 10px;
  overflow-y: auto;
`
