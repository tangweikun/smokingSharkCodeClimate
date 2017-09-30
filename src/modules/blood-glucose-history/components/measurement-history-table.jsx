import React, { PropTypes } from 'react'
import { Table, FormControl } from '@sketchpixy/rubix'
import moment from 'moment'
import DatePicker from 'react-bootstrap-date-picker'
import { datePickerProps } from '../../../api/date-helper'
import MeasurementHistoryDateRow from './measurement-history-date-row.jsx'
import MeasurementHistoryRow from './measurement-history-row.jsx'
import { getWeekday } from '../../../api/time-helper'

export default class MeasurementHistoryTable extends React.Component {
  getStyles() {
    return {
      editToolBar: {
        display: 'inline-block',
        marginRight: '20px',
        marginTop: '4px',
        cursor: 'pointer',
      },
      inputShort: {
        width: '50px',
        textAlign: 'center',
        borderRadius: '4px',
        color: 'black',
        border: '1px solid #979797',
        fontWeight: 'bold',
      },
      inputLong: {
        width: '140px',
        textAlign: 'center',
        borderRadius: '4px',
        color: 'black',
        border: '1px solid #979797',
        fontWeight: 'bold',
      },
    }
  }

  getRows() {
    const renderItems = (treatmentHistory) => {
      function shouldRenderDate(c, i, array) {
        if (i === 0) return true
        const m1 = moment(c.createdAt)
        const m2 = moment(array[i - 1].createdAt)
        if (!m1.isSame(m2, 'day')) return true
        return false
      }

      function renderDateItem(item, index) {
        return <MeasurementHistoryDateRow treatmentDate={(item.value)} key={index} />
      }

      const arrayOfTableRows = []
      treatmentHistory.map((item, index, arr) => {
        if (shouldRenderDate(item, index, arr)) {
          arrayOfTableRows.push({
            type: 'dateRow',
            value: getWeekday(item.createdAt),
          })
        }
        arrayOfTableRows.push(item)
        return ''
      })
      return arrayOfTableRows.map((item, index) => {
        if (item.type) {
          return renderDateItem(item, index)
        }
        return (
          <MeasurementHistoryRow
            treatment={item} key={item._id} deleteBloodGlucoses={this.props.deleteBloodGlucoses}
            getMeasurementHistory={this.props.getMeasurementHistory}
          />)
      })
    }

    const { treatmentHistory } = this.props
    if (treatmentHistory && treatmentHistory.length) {
      return renderItems(treatmentHistory)
    }

    return null
  }

  handleChange(e) {
    const { name, value } = e.target
    this.props.editBloodGlucoses(name, value)
  }

  render() {
    const styles = this.getStyles()
    const { formData, editBloodGlucoses } = this.props
    const columnTitlesList = ['血糖值', '状态', '服药', '胰岛素', '运动', '食物', '图片', '留言', '备注', '时间', '来源', '操作']

    //  iGlucose传过来的字段与我们所需显示的不同
    const optionsLabel = ['早餐前', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '睡前', '凌晨']
    const optionsLabelForSave = ['早餐前', '早餐后', '午餐前', '午餐后', '晚餐前', '晚餐后', '半夜', '凌晨']

    return (
      <Table responsive bordered style={{ border: 'solid 1px #7d96a6', marginTop: '12px' }}>
        <thead style={{ backgroundColor: '#7d96a6' }}>
          <tr>
            {
              columnTitlesList.map((item, index) => <th className="text-center fg-white" style={{ borderRight: '1px solid rgba(0, 0, 0, 0.05)', borderBottom: '1px solid rgba(0, 0, 0, 0.05)' }} key={index}>{item}</th>)
            }
          </tr>
        </thead>
        <tbody>
          <tr style={this.props.isEditing ? { backgroundColor: 'rgba(248, 230, 27, 0.2)' } : { display: 'none' }}>
            <td className="text-center" colSpan="12">
              <div style={{ float: 'left' }}>
                <DatePicker
                  {...datePickerProps}
                  calendarContainer={document.body}
                  value={formData.createdAt.toISOString()}
                  onChange={(value) => {
                    const date = value || new Date()
                    editBloodGlucoses('createdAt', new Date(moment(date).set('hour', 12)))
                  }}
                />
              </div>
              <div style={{ float: 'right' }}>
                <div
                  style={styles.editToolBar}
                  onClick={() => {
                    this.props.insertBloodGlucoses()
                    this.props.startInsertBloodGlucoses()
                    this.props.getMeasurementHistory(formData.author)
                  }}
                >
                  保存
                </div>
                <div
                  style={styles.editToolBar}
                  onClick={() => this.props.startInsertBloodGlucoses()}
                >
                  取消
                </div>
              </div>
            </td>
          </tr>
          <tr style={this.props.isEditing ? { backgroundColor: 'rgba(248, 230, 27, 0.2)' } : { display: 'none' }}>
            <td className="text-center">
              <input
                style={styles.inputShort} name="bgValue" value={formData.bgValue || ''}
                onChange={e => this.handleChange(e)}
              />
            </td>
            <td className="text-center">
              <FormControl
                componentClass="select"
                onChange={e => this.props.editBloodGlucoses('dinnerSituation', e.target.value)}
              >
                {
                  optionsLabel.map((item, index) => (
                    <option key={index} value={optionsLabelForSave[index]}>{item}</option>
                  ))
                }
              </FormControl>
            </td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td />
            <td className="text-center">
              <input style={styles.inputLong} name="remarks" onChange={e => this.handleChange(e)} value={formData.remarks || ''} />
            </td>
            <td />
            <td />
            <td />
          </tr>
          {this.getRows()}
        </tbody>
      </Table>
    )
  }
}

MeasurementHistoryTable.propTypes = {
  treatmentHistory: PropTypes.array,
  editBloodGlucoses: PropTypes.func,
  formData: PropTypes.object,
  insertBloodGlucoses: PropTypes.func,
  isEditing: PropTypes.bool,
  startInsertBloodGlucoses: PropTypes.func,
  getMeasurementHistory: PropTypes.func,
  deleteBloodGlucoses: PropTypes.func,
}
