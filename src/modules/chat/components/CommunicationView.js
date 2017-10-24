import React, { PropTypes } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import moment from 'moment'
import { Table, Button } from 'antd'

import AddCommunicationButton from '../containers/AddCommButton'

const columns = [
  {
    title: '编辑',
    dataIndex: 'edit',
    width: '30px',
  },
  {
    title: '当次沟通时间/主题',
    dataIndex: 'currTopic',
    width: '40%',
  },
  {
    title: '下次沟通时间/主题',
    dataIndex: 'nextTopic',
    width: '40%',
  },
  {
    title: '来源',
    dataIndex: 'source',
    width: '100px',
    render: x => <CenterContent>{x}</CenterContent>,
  },
]

const MethodDic = {
  ONLINE_CHAT: '在线聊天',
  PHONE: '电话沟通',
}
const InitiatorDic = {
  ASSISTANT: '照护师',
  PATIENT: '患者',
}

export default (props) => {
  let data = []
  if (!props.data.loading) {
    const communications = get(props.data, 'patient.communications', [])
    data = communications.map((comm) => {
      const row = { key: comm._id }
      row.edit = (
        <CenterDiv>
          <EditIcon icon="edit" onClick={() => props.popupEditor({ record: comm })} />
        </CenterDiv>
      )
      row.currTopic = (
        <div>
          <DateLabel>{moment(comm.createdAt).format('YYYY年MM月DD日 hh:mm')}</DateLabel>
          <Content>{comm.currentTopic}</Content>
        </div>
      )
      row.nextTopic = comm.nextTopic ? (
        <div>
          {comm.nextDate && <DateLabel>{moment(comm.nextDate).format('YYYY年MM月DD日')}</DateLabel>}
          <Content>{comm.nextTopic}</Content>
        </div>
      ) : (
        <CenterContent>无</CenterContent>
      )
      row.source = <div>{`${InitiatorDic[comm.initiator]} / ${MethodDic[comm.method]}`}</div>
      return row
    })
  }
  return (
    <div>
      <ButtonsBar>
        <AddCommunicationButton />
      </ButtonsBar>
      <StyledTable bordered pagination={false} dataSource={data} columns={columns} />
    </div>
  )
}

const CenterDiv = styled.div`text-align: center;`

const ButtonsBar = styled.div`
  text-align: right;
  margin: 5px;
`

const DateLabel = styled.span`
  font-weight: bold;
  padding-right: 6px;
  color: #111;
`

const Content = styled.span`color: #999;`

const CenterContent = styled.div`
  text-align: center;
  color: #999;
`

const StyledTable = styled(Table)`
  .ant-table-thead th {
    text-align: center;
  }
`

const EditIcon = styled(Button)`
  border: none;
  background: none;
  &:hover {
    background: none;
  }
`
