import {
  BG_TABLE_TR_HEIGHT,
  BG_SCROLL_CHANGE,
  BG_CHANGE_DATA,
  BG_CHANGE_DATE,
  BG_CHANGE_MARGIN_TOP,
  BG_INITIALIZE,
} from '../constants/blood-glucose'

const defaultState = {
  date: '',
  marginTop: BG_TABLE_TR_HEIGHT,
  bgData: [],
  dateIndex: [],
  treatmentHistory: [],
  formData: { createdAt: new Date(), dinnerSituation: '早餐前' },
  isEditing: false,
}

export default (state = defaultState, action) => {
  const {
    date,
    marginTop,
    bgData,
    type,
    dateIndex,
    lastScrollTop,
    treatmentHistory,
    key,
    value,
  } = action
  switch (type) {
    case BG_INITIALIZE:
      return {
        ...state,
        date,
        bgData,
        dateIndex,
        marginTop: BG_TABLE_TR_HEIGHT,
      }
    case BG_CHANGE_DATE:
      return {
        ...state,
        marginTop,
        date,
        lastScrollTop,
      }
    case BG_SCROLL_CHANGE:
      return {
        ...state,
        date,
        lastScrollTop,
      }
    case BG_CHANGE_MARGIN_TOP:
      return {
        ...state,
        marginTop,
      }
    case BG_CHANGE_DATA:
      return {
        ...state,
        bgData,
      }
    case 'GET_MEASUREMENT_HISTORY':
      return {
        ...state,
        treatmentHistory,
      }
    case 'EDIT_BLOOD_GLUCOSES':
      return {
        ...state,
        formData: {
          ...state.formData,
          [key]: value,
        },
      }
    case 'START_INSERT_BLOOD_GLUCOSES':
      return {
        ...state,
        isEditing: !state.isEditing,
        formData: {
          createdAt: new Date(),
          author: state.formData.author,
          dinnerSituation: state.formData.dinnerSituation,
        },
      }
    default:
      return state
  }
}
