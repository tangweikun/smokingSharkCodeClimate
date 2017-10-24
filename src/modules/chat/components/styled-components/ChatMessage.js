import styled from 'styled-components'
import { Avatar, Tabs } from 'antd'

export const TabsWithStyle = styled(Tabs)`
  .ant-tabs-bar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 0;
  }
  .ant-tabs-nav-wrap {
    text-align: center;
    font-weight: 200;
    font-size: 12px;
  }
  .ant-tabs-nav-container {
    width: 300px;
  }
`
export const ChatMessagePanel = styled.div`
  flex: 0 0 320px;
  background-color: #fff;
  overflow-y: auto;
`
export const ChatMessageBox = styled.div`
  float: right;
  padding: 10px, 0, 10px, 5px;
  width: 300px;
`

export const ChatMessageItem = styled.div`
  height: 64px;
  background-color: ${props => (props.selected ? '#f4f4f2' : '#fff')};
  cursor: pointer;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  padding: 0 14px;
`

export const ChatMessageAvatar = styled(Avatar)`
  width: 40px !important;
  height: 40px !important;
  line-height: 40px !important;
  border-radius: 20px !important;
  flex-shrink: 0;
  img {
    line-height: 40px !important;
  }
`
export const InfoWrapper = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-flow: column nowrap;
  padding: 0 10px;
`
export const UserName = styled.div`
  white-space: nowrap;
  font-weight: 600;
  margin-right: 5px;
`

export const ChatMessageDate = styled.span`
  color: #9b9b9b;
  flex: 1 1 auto;
  text-align: end;
`

export const ChatMessageBrief = styled.div`
  height: 20px;
  font-family: Microsoft YaHei;
  font-size: 12px;
  font-weight: lighter;
  font-style: normal;
  font-stretch: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9b9b9b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 232px;
`

export const NameLine = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`

// export const ChatMessageBtnContainer = styled.div``
