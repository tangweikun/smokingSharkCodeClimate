import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import isEqual from 'lodash/isEqual'

import BloodGlucose from '../components/blood-glucose-history.jsx'
import { scroll, loadBGDidMount } from '../actions/blood-glucose'
import {
  BG_TABEL_BODY_HEIGHT,
} from '../constants/blood-glucose'

const LOW_BLOOD_SUGAR_MAX_VALUE = 4

const mapStateToProps = state => ({
  bloodGlucose: state.bloodGlucose.bgData,
  sourceData: state.bloodGlucose.treatmentHistory,
  date: state.bloodGlucose.date,
  marginTop: state.bloodGlucose.marginTop,
  baseHeight: BG_TABEL_BODY_HEIGHT,
  getClassName: (i, value) => {
    let className = ''
    if (i === 0) {
      className = 'font-light'
    } else if (!!value && value < LOW_BLOOD_SUGAR_MAX_VALUE) {
      className = ' bg-error'
    } else if (i % 2 === 0) {
      className = 'bg-light'
    }
    return className
  },
})

class BloodGlucoseContainer extends Component {
  static propTypes = {
    loadBGDidMount: PropTypes.func,
    sourceData: PropTypes.array,
  }
  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.sourceData, this.props.sourceData)) {
      this.props.loadBGDidMount(nextProps.sourceData)
    }
  }
  render() {
    const props = this.props
    return <BloodGlucose {...props} />
  }
}

export default connect(
  mapStateToProps, {
    scroll,
    loadBGDidMount,
  },
)(BloodGlucoseContainer)
