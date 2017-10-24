import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Icon, Button } from '@sketchpixy/rubix'

export default class MeasurementHistoryRow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { modelOpen: false }
  }

  getStyles() {
    return {
      model: {
        position: 'absolute',
        top: '0px',
        right: '0px',
        zIndex: 1999,
        border: '1px solid #979797',
        boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.3)',
        borderRadius: '3px',
        width: '180px',
        height: '50px',
        lineHeight: '50px',
        backgroundColor: '#ffffff',
      },
      verticalMiddle: {
        verticalAlign: 'middle',
      },
    }
  }

  renderPills() {
    const t = this.props.treatment || {}
    const pillNote = t.pillNote || []
    return pillNote.map((a, n) => (
      <div key={n}>
        {a.type} {a.value}
      </div>
    ))
  }
  render() {
    const styles = this.getStyles()
    const {
      bgValue,
      dinnerSituation,
      pillNote,
      insulinInjection,
      sportNote,
      mealNote,
      remarks,
      source,
      voiceNote,
      createdAt,
      _id,
      author,
    } = this.props.treatment

    const isManual = source === 'manual'

    const transformBgValue = (bgValue / 18).toFixed(1)
    let color = '#000000'
    if (transformBgValue < 2.8) color = '#D71F4B'
    else if (transformBgValue >= 2.8 && transformBgValue < 4) color = '#FF5200'
    else if (transformBgValue > 14) color = '#F6A623'

    const bgValueStyle = {
      verticalAlign: 'middle',
      color,
    }

    return (
      <tr>
        <td className="fg-warning text-center" style={bgValueStyle}>
          {transformBgValue}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {dinnerSituation}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {pillNote ? <div>{this.renderPills()}</div> : ''}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {insulinInjection}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {sportNote}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {mealNote}
        </td>
        <td className="text-center" style={styles.verticalMiddle} />
        <td className="text-center" style={styles.verticalMiddle}>
          {voiceNote ? (
            <audio controls style={{ width: '120px', verticalAlign: 'middle' }}>
              <source src={voiceNote} />
            </audio>
          ) : null}
        </td>
        <td
          className="text-center"
          style={{ verticalAlign: 'middle', wordBreak: 'break-all', maxWidth: '124px' }}
        >
          {remarks}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {isManual ? '' : moment(createdAt).format('HH:mm')}
        </td>
        <td className="text-center" style={styles.verticalMiddle}>
          {isManual ? '手动' : '自动'}
        </td>
        <td
          className="text-center"
          style={{ verticalAlign: 'middle', cursor: 'pointer', position: 'relative' }}
        >
          {this.state.modelOpen ? (
            <div style={styles.model} onMouseLeave={() => this.setState({ modelOpen: false })}>
              <Button
                bsStyle="danger"
                style={{ marginRight: '5px' }}
                onClick={() => {
                  this.setState({ modelOpen: false })
                  this.props.deleteBloodGlucoses(_id)
                  this.props.getMeasurementHistory(author)
                }}
              >
                确认删除
              </Button>
              <Button bsStyle="default" onClick={() => this.setState({ modelOpen: false })}>
                取消
              </Button>
            </div>
          ) : (
            ''
          )}
          {isManual ? (
            <Icon glyph="glyphicon-trash" onClick={() => this.setState({ modelOpen: true })} />
          ) : (
            ''
          )}
        </td>
      </tr>
    )
  }
}

MeasurementHistoryRow.propTypes = {
  treatment: PropTypes.object,
  deleteBloodGlucoses: PropTypes.func,
  getMeasurementHistory: PropTypes.func,
}
