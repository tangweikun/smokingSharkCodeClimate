import React from 'react'
import PropTypes from 'prop-types'

export default class MeasurementHistoryDateRow extends React.Component {
  render() {
    return (
      <tr style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <td className="text-left" colSpan="12">
          {this.props.treatmentDate}
        </td>
      </tr>
    )
  }
}

MeasurementHistoryDateRow.propTypes = {
  treatmentDate: PropTypes.any,
}
