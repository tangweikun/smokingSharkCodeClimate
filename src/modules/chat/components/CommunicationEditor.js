import React, { PropTypes } from 'react'
import styled from 'styled-components'
import get from 'lodash/get'
import moment from 'moment'
import { Form, Button, Input, Radio, DatePicker } from 'antd'

const FormItem = Form.Item
const inlineLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
}
const EditorModal = (props) => {
  const { closeModal, form, saveCommunication, data, record } = props
  const { loading } = data || {}
  const { getFieldDecorator } = form
  const disabledDateFunc = (currDate) => {
    if (loading || !currDate) return true
    const endOfToday = moment().endOf('day')
    const closestAppointmentTime = get(data, 'patient.closestAppointment.appointmentTime')
    if (!closestAppointmentTime) return currDate.isBefore(endOfToday)

    const lastDayOfAllowPeriod = moment(closestAppointmentTime)
      .subtract(1, 'day')
      .endOf('day')
    return !currDate.isBetween(endOfToday, lastDayOfAllowPeriod)
  }
  const getDecorator = (field, defaultValue = null) => {
    let initialValue = record ? record[field] : defaultValue
    if (field === 'nextDate' && !!initialValue) {
      initialValue = moment(initialValue)
    }
    return getFieldDecorator(field, {
      initialValue,
    })
  }
  return (
    <Form
      layout="vertical"
      onSubmit={(e) => {
        e.preventDefault()
        saveCommunication(props)
      }}
    >
      <FormItem label="本次沟通主题">{getDecorator('currentTopic')(<Input.TextArea />)}</FormItem>
      <FormItem label="发起者">
        {getDecorator('initiator', 'ASSISTANT')(
          <Radio.Group>
            <Radio value="ASSISTANT">照护师</Radio>
            <Radio value="PATIENT">患者</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem label="沟通方式">
        {getDecorator('method', 'ONLINE_CHAT')(
          <Radio.Group>
            <Radio value="ONLINE_CHAT">在线聊天</Radio>
            <Radio value="PHONE">电话沟通</Radio>
          </Radio.Group>,
        )}
      </FormItem>
      <FormItem label="下次沟通主题">{getDecorator('nextTopic')(<Input.TextArea />)}</FormItem>
      <FormItem {...inlineLayout} label="下次沟通时间">
        {getDecorator('nextDate')(
          <DatePicker disabled={!!record} disabledDate={disabledDateFunc} />,
        )}
      </FormItem>
      <FormItem>
        <ButtonsBar>
          <Button icon="close" onClick={closeModal}>
            取 消
          </Button>
          <Gap />
          <Button type="primary" htmlType="submit" icon="save">
            保 存
          </Button>
        </ButtonsBar>
      </FormItem>
    </Form>
  )
}

EditorModal.propTypes = {
  closeModal: PropTypes.func,
  saveCommunication: PropTypes.func,
  form: PropTypes.object,
  data: PropTypes.object,
}

export default Form.create()(EditorModal)

const ButtonsBar = styled.div`
  text-align: right;
  margin: 5px;
`

const Gap = styled.div`
  width: 10px;
  display: inline-block;
`
