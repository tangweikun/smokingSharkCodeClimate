import React from 'react'
import { Card, Radio, Button } from 'antd'
import styled from 'styled-components'
import moment from 'moment'

const data = [
  {
    _id: 'f5af0a03b9dd397c9b2666f8',
    name: 'Nick',
    attribute: '男 | 30岁 | 2型',
    source: '病历，SOAP',
    createdAt: '10月20日',
  },
  {
    _id: 'c2664492da4cfa62005ad875',
    name: 'wuzhen',
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

const gridStyle = {
  width: '100%',
  textAlign: 'left',
  padding: 10,
}

const DateSwitcher = ({ timeFrame, selectedDay, previous, next }) => (
  <div>
    <Button shape="circle" onClick={previous()} icon="left" />
    <Button shape="circle" onClick={next()} style={{ margin: 5 }} icon="right" />
    {timeFrame === 'days' && moment(selectedDay).format('YYYY[年] MMMDo ddd')}
    {timeFrame === 'weeks' &&
      `${moment(selectedDay).format('LL')} ~ ${moment(selectedDay)
        .endOf('week')
        .format('Do')}`}
  </div>
)

const CalendarContent = ({
  timeFrame,
  changeTimeFrame,
  selectedWeekStart,
  selectedDay,
  previousDay,
  nextDay,
  previousWeek,
  nextWeek,
}) => (
  <Card
    title={
      timeFrame === 'days' ? (
        <DateSwitcher
          timeFrame={timeFrame}
          selectedDay={selectedDay}
          previous={previousDay}
          next={nextDay}
        />
      ) : (
        <DateSwitcher
          timeFrame={timeFrame}
          selectedDay={selectedWeekStart}
          previous={previousWeek}
          next={nextWeek}
        />
      )
    }
    extra={
      <Radio.Group onChange={changeTimeFrame()} defaultValue={timeFrame} size="small">
        <Radio.Button value="days">今日</Radio.Button>
        <Radio.Button value="weeks">周</Radio.Button>
      </Radio.Group>
    }
  >
    {timeFrame === 'days' && <OneDayOfAppointments selectedDay={selectedDay} />}
    {timeFrame === 'weeks' && <OneWeekOfAppointments selectedWeekStart={selectedWeekStart} />}
  </Card>
)

const OneDayOfAppointments = ({ selectedDay }) => (
  <div>
    <Card.Grid style={{ width: '100%', padding: 10, textAlign: 'center' }}>
      {moment(selectedDay).format('MMMDo ddd')}
    </Card.Grid>
    {data ? (
      data.map(x => (
        <Card.Grid onClick={() => alert(x._id)} style={gridStyle}>
          {x.name}
        </Card.Grid>
      ))
    ) : (
      <Card.Grid style={gridStyle}>没有</Card.Grid>
    )}
  </div>
)

export const OneWeekOfAppointments = ({ selectedWeekStart }) => (
  <Flex>
    {[0, 1, 2, 3, 4, 5, 6].map(x => (
      <OneDayOfAppointments
        selectedDay={moment(selectedWeekStart)
          .add(x, 'days')
          .toISOString()}
      />
    ))}
  </Flex>
)

const Flex = styled.div`display: flex;`

export default class OutreachCalendar extends React.Component {
  state = {
    timeFrame: 'weeks',
    selectedWeekStart: moment()
      .startOf('week')
      .toISOString(),
    selectedDay: moment()
      .startOf('week')
      .toISOString(),
  }
  changeTimeFrame = (e) => {
    this.setState({ timeFrame: e.target.value })
  }
  previousDay = () => {
    this.setState({
      selectedDay: moment(this.state.selectedDay)
        .subtract(1, 'days')
        .toISOString(),
    })
  }
  nextDay = () => {
    this.setState({
      selectedDay: moment(this.state.selectedDay)
        .add(1, 'days')
        .toISOString(),
    })
  }
  previousWeek = () => {
    this.setState({
      selectedDay: moment(this.state.selectedWeekStart)
        .subtract(1, 'weeks')
        .toISOString(),
      selectedWeekStart: moment(this.state.selectedWeekStart)
        .subtract(1, 'weeks')
        .toISOString(),
    })
  }
  nextWeek = () => {
    this.setState({
      selectedDay: moment(this.state.selectedWeekStart)
        .add(1, 'weeks')
        .toISOString(),
      selectedWeekStart: moment(this.state.selectedWeekStart)
        .add(1, 'weeks')
        .toISOString(),
    })
  }
  render() {
    return (
      <CalendarContent
        timeFrame={this.state.timeFrame}
        changeTimeFrame={() => this.changeTimeFrame}
        selectedWeekStart={this.state.selectedWeekStart}
        selectedDay={this.state.selectedDay}
        previousDay={() => this.previousDay}
        nextDay={() => this.nextDay}
        previousWeek={() => this.previousWeek}
        nextWeek={() => this.nextWeek}
      />
    )
  }
}
