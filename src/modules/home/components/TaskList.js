import React from 'react'
import { Table } from 'antd'

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    width: '70px',
    render: x => <div style={{ wordBreak: 'break-word' }}>{x}</div>,
  },
  {
    title: '特征',
    dataIndex: 'attribute',
    width: '120px',
  },
  {
    title: '来源',
    dataIndex: 'source',
    width: '120px',
  },
  {
    title: '进入时间',
    dataIndex: 'createdAt',
    width: '120px',
  },
]
const data = [
  {
    _id: '0',
    name: 'YARED BELAY',
    attribute: '男 | 30岁 | 2型',
    source: '病历，SOAP',
    createdAt: '10月20日',
  },
  {
    _id: '1',
    name: '汪涵',
    attribute: '男 | 40岁 | 2型',
    source: '病历，SOAP',
    createdAt: '10月20日',
  },
  {
    _id: '2',
    name: '刘德华',
    attribute: '男 | 50岁 | 2型',
    source: '病历，SOAP',
    createdAt: '10月20日',
  },
  {
    _id: '3',
    name: '李嘉诚',
    attribute: '男 | 60岁 | 2型',
    source: '病历，SOAP',
    createdAt: '10月20日',
  },
]

export default function () {
  return <Table bordered pagination={false} dataSource={data} columns={columns} />
}
