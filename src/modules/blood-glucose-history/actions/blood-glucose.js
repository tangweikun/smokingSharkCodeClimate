import moment from 'moment'
import { get } from 'lodash'
import throttle from 'lodash/throttle'

import {
  BG_SCROLL_CHANGE,
  BG_INITIALIZE,
  BG_TABLE_TR_HEIGHT,
  DINNERSITUATION,
} from '../constants/blood-glucose'

const defaultValue = [
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
]

const getDateArea = (date) => {
  let mDate = moment(date)
  const dayOfWeek = mDate.format('E')
  const startDate = mDate.add((dayOfWeek - 1) * -1, 'days')
    .format('YYYY年MM月DD日')
  mDate = moment(date)
  const endDate = mDate.add(7 - dayOfWeek, 'days')
    .format('YYYY年MM月DD日')
  return `${endDate} - ${startDate}`
}
const getValue = value => (value / 18).toFixed(1)
const getDayOfWeek = (date) => {
  const array = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
  const dayOfWeek = +moment(date).format('d')

  return array[dayOfWeek]
}
const getBGValueArray = (bgValue, valueIndex, dayOfWeek) => {
  const values = [...defaultValue]
  values[0] = dayOfWeek
  values[valueIndex] = bgValue
  return values
}

export const loadBloodGlucose = () =>
  (dispatch, treamentHistory) => {
    const bgData = []
    let date = null
    const dateIndex = [0]
    if (treamentHistory) {
      const dataSource = treamentHistory.sort((a, b) => b.createdAt - a.createdAt)
      dataSource.forEach((item, i) => {
        const valueIndex = get(DINNERSITUATION, item.dinnerSituation)
        const dateArea = getDateArea(item.createdAt)
        if (i === 0) date = dateArea
        const dataValue = getValue(item.bgValue)
        const dayOfWeek = getDayOfWeek(item.createdAt)
        const lastData = bgData.length && bgData[bgData.length - 1]

        if (get(lastData, 'date') === dateArea) {
          const lastDataValueLength = lastData && lastData.values.length
          const lastDataValue = lastDataValueLength && lastData.values[lastDataValueLength - 1]
          const latestData = i > 0 ? dataSource[i - 1] : null
          const latestDate = latestData && getDayOfWeek(latestData.createdAt)
          if (lastDataValue && latestDate === dayOfWeek) {
            if (!lastDataValue[valueIndex]) {
              lastDataValue[valueIndex] = dataValue
            } else if (typeof lastDataValue[valueIndex] === 'string') {
              lastDataValue[valueIndex] = [lastDataValue[valueIndex], dataValue]
            } else {
              lastDataValue[valueIndex].push(dataValue)
            }
          } else {
            lastData.values.push(getBGValueArray(dataValue, valueIndex, dayOfWeek))
          }
        } else if (valueIndex !== undefined) {
          const bloodGlucose = {
            date: dateArea,
            values: [getBGValueArray(dataValue, valueIndex, dayOfWeek)],
          }
          bgData.push(bloodGlucose)
          if (lastData) {
            const lastDataLength = lastData.values.length
            const dateIndexLast = dateIndex[dateIndex.length - 1] + 1
            dateIndex.push(lastDataLength + dateIndexLast)
          }
        }
      })
    }

    dispatch({
      type: BG_INITIALIZE,
      date,
      bgData,
      dateIndex,
    })
  }

export const loadBGDidMount = data =>
  (dispatch) => {
    loadBloodGlucose()(dispatch, data)
  }


export const scroll = throttle(e =>
  (dispatch, getState) => {
    const {
      dateIndex,
      bgData,
      marginTop,
    } = getState().bloodGlucose
    const { scrollTop } = e.target
    const scrollAt = scrollTop + marginTop
    const scrollCount = scrollAt / BG_TABLE_TR_HEIGHT
    let marginTopCount = 0
    for (let i = 0, len = dateIndex.length; i < len; i++) {
      if (scrollCount >= dateIndex[i]) marginTopCount += 1
    }
    const currentDateIndex = marginTopCount - 1
    const { date } = bgData[currentDateIndex]
    dispatch({
      type: BG_SCROLL_CHANGE,
      lastScrollTop: scrollTop,
      date,
    })
  }, 800)

export const getMeasurementHistory = userId =>
  (dispatch, getState, { Meteor }) => {
    Meteor.call('getBloodGlucosesByUser', userId, (err, treatmentHistory) => {
      dispatch({
        type: 'GET_MEASUREMENT_HISTORY',
        treatmentHistory,
      })
      dispatch({
        type: 'EDIT_BLOOD_GLUCOSES',
        key: 'author',
        value: userId,
      })
    })
  }

export const editBloodGlucoses = (key, value) => ({
  type: 'EDIT_BLOOD_GLUCOSES',
  key,
  value,
})

export const insertBloodGlucoses = () =>
  (dispatch, getState, { Meteor }) => {
    Meteor.call('addBloodGlucoses', getState().bloodGlucose.formData)
  }

export const startInsertBloodGlucoses = () => ({
  type: 'START_INSERT_BLOOD_GLUCOSES',
})

export const deleteBloodGlucoses = _id =>
  (dispatch, getState, { Meteor }) => {
    Meteor.call('bloodGlucoses.delete', _id)
  }
