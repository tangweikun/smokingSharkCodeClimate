import React, { PropTypes } from 'react'
import {
  PanelContainer,
  PanelHeader,
  Panel,
} from '@sketchpixy/rubix'
import ReactTooltip from 'react-tooltip'

const TD_ARRAY = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const LOW_BLOOD_SUGAR_MAX_VALUE = 4

export default class BloodGlucoseHistory extends React.Component {
  getStyle(isMultiple) {
    return {
      multipleTip: {
        position: 'absolute',
        right: '0px',
        bottom: '0px',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 0 10px 10px',
        borderColor: 'transparent transparent #6D9EE1 transparent',
      },
      td: {
        cursor: isMultiple ? 'pointer' : '',
        position: 'relative',
        borderBottom: 'rgba(0, 0, 0, 0.26) solid 0.5px',
        borderLeft: 'rgba(0, 0, 0, 0.26) solid 0.5px',
        borderRight: 'rgba(0, 0, 0, 0.26) solid 0.5px',
      },
      border: {
        borderBottom: 'rgba(0, 0, 0, 0.26) solid 0.5px',
        borderLeft: 'rgba(0, 0, 0, 0.26) solid 0.5px',
        borderRight: 'rgba(0, 0, 0, 0.26) solid 0.5px',
      },
    }
  }

  render() {
    const {
      bloodGlucose,
      date,
      scroll,
      getClassName,
    } = this.props
    const tbody = []
    const dataNumber = [0]
    const styles = this.getStyle()
    const getValueList = valueList => valueList.map((value, index) => <p key={index} style={value < LOW_BLOOD_SUGAR_MAX_VALUE ? { color: '#ff5200' } : {}}>{value}</p>)
    bloodGlucose.forEach((item, i) => {
      tbody.push(
        <tr key={`bg-date-${i}`}>
          <td
            className="bg-gray font-light"
            style={styles.border}
            colSpan="9"
          >{item.date}</td>
        </tr>,
        )

      item.values.forEach((value, j) =>
         tbody.push(
           <tr className="bp-value" key={`bg-value-tr-${i}-${j}`}>
             {
              TD_ARRAY.map((k) => {
                const isMultiple = value[k] && typeof value[k] === 'object'
                const identity = `bg-value-${i}-${j}-${k}`
                return (
                  <td
                    data-tip="tooltip"
                    data-for={identity}
                    key={identity}
                    className={getClassName(k, value[k])}
                    style={this.getStyle(isMultiple).td}
                  >
                    {
                      isMultiple ? [
                        value[k][0],
                        <ReactTooltip
                          key={`tooltip-${i}-${j}-${k}`}
                          place="right"
                          id={identity}
                          getContent={() => <div>{getValueList(value[k])}</div>}
                        />,
                        <span
                          key={`tip-${i}-${j}-${k}`}
                          style={styles.multipleTip}
                        />,
                      ] : value[k]
                    }
                  </td>)
              })}
           </tr>,
        ))
      dataNumber.push(item.values.length)
    })

    return (
      <PanelContainer controls={false} className="blood-glucose-panel-container">
        <Panel>
          <PanelHeader
            style={{
              padding: 0,
              color: '#fff',
              backgroundColor: '#627784',
              zIndex: 2,
              position: 'relative',
            }}
          >
            <div
              style={{
                fontSize: '18px',
                height: '60px',
                lineHeight: '61px',
                textIndent: '20px',
              }}
            >血糖测量历史记录</div>
          </PanelHeader>
          <table className="blood-glucose-table">
            <thead>
              <tr className="bg-dark">
                <th rowSpan="2">星<br />期</th>
                <th colSpan="2">早餐</th>
                <th colSpan="2">午餐</th>
                <th colSpan="2">晚餐</th>
                <th rowSpan="2">睡<br />前</th>
                <th rowSpan="2">凌<br />晨</th>
                <th style={{ borderRight: 'none' }} rowSpan="2">随<br />机</th>
              </tr>
              <tr className="bg-dark">
                <th>空</th>
                <th>后</th>
                <th>前</th>
                <th>后</th>
                <th>前</th>
                <th>后</th>
              </tr>
              <tr className="bg-dark">
                <th className="" colSpan="10">{date}</th>
              </tr>
            </thead>
            <tbody onScroll={scroll}>
              {tbody}
            </tbody>
          </table>
        </Panel>
      </PanelContainer>
    )
  }
}

BloodGlucoseHistory.propTypes = {
  bloodGlucose: PropTypes.array,
  scroll: PropTypes.func,
  date: PropTypes.string,
  getClassName: PropTypes.func,
}
