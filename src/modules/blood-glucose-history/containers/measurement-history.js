import { connect } from 'react-redux'
import React from 'react'
import PropTypes from 'prop-types'
import { get } from 'lodash'
import { withRouter } from 'react-router'
import MeasurementHistory from '../components/measurement-history.jsx'
import {
  getMeasurementHistory,
  editBloodGlucoses,
  insertBloodGlucoses,
  startInsertBloodGlucoses,
  deleteBloodGlucoses,
} from '../actions/blood-glucose'

const mapStateToProps = state => ({
  treatmentHistory: state.bloodGlucose.treatmentHistory,
  formData: state.bloodGlucose.formData,
  isEditing: state.bloodGlucose.isEditing,
})

@withRouter
class container extends React.Component {
  componentDidMount() {
    const patientIdFromRouter = get(this.props, 'params.patientId')
    this.props.getMeasurementHistory(patientIdFromRouter)
  }

  componentWillReceiveProps(nextProps) {
    const patientIdFromRouter = get(this.props, 'params.patientId')
    const patientIdFromNextRouter = get(nextProps, 'params.patientId')
    if (patientIdFromNextRouter !== patientIdFromRouter) {
      this.props.getMeasurementHistory(patientIdFromNextRouter)
    }
  }

  render() {
    return <MeasurementHistory {...this.props} />
  }
}

export default connect(mapStateToProps, {
  getMeasurementHistory,
  editBloodGlucoses,
  insertBloodGlucoses,
  startInsertBloodGlucoses,
  deleteBloodGlucoses,
})(container)

container.propTypes = {
  getMeasurementHistory: PropTypes.func,
}
