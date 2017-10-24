import React from 'react'
import styled from 'styled-components'
import { Card, Radio } from 'antd'
import TaskList from './TaskList'
import OutreachCalendar from './Calendar'

export default function () {
  return (
    <Wrapper>
      <TaskListContainer />
      <CalendarContainer />
    </Wrapper>
  )
}
const TaskListContainer = () => (
  <FixedPanel>
    <Card
      title="需要院外管理的患者"
      extra={
        <Radio.Group defaultValue="a" size="small">
          <Radio.Button value="a">今日</Radio.Button>
          <Radio.Button value="b">3日</Radio.Button>
          <Radio.Button value="c">7日</Radio.Button>
          <Radio.Button value="d">全部</Radio.Button>
        </Radio.Group>
      }
    >
      <TaskList />
    </Card>
  </FixedPanel>
)

const CalendarContainer = () => (
  <Panel>
    <Card title="下次沟通任务表" style={{ flexGrow: '1' }}>
      <OutreachCalendar />
    </Card>
  </Panel>
)

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
`

const FixedPanel = styled.div`
  display: flex;
  flex-direction: row;
  flex: 0 0 450px;
`
const Panel = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1 1 auto;
`

const PeriodWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 48px;
`

const Period = styled.div`
  padding: 4px 8px;
  border: 1px solid #ddd;
  height: unset;
  line-height: 14px;
`
