import uniqWith from 'lodash/uniqWith'
import isEqual from 'lodash/isEqual'

const initialState = {
  unReadMessageCount: 0,
  patients: {},
}

const initialChatRoomState = {
  chatRoomId: null,
  chatRoomName: '',
  unReadMessageCount: 0,
  latestMessageCreatedAt: null,
  participants: [],
  status: 'OPEN',
  messages: [],
}

const chatViewReducer = (state = initialState, action) => {
  const { patientId } = action
  switch (action.type) {
    case 'UPDATE_CHAT_ROOM': {
      const chatRooms = state.patients
      const existsChatRoom = chatRooms[patientId]
      if (existsChatRoom) {
        const mergeMessages = uniqWith(
          [
            ...action.messages.sort((a, b) => a.createdAt > b.createdAt),
            ...state.patients[patientId].messages,
          ],
          isEqual,
        )
        return {
          ...state,
          patients: {
            ...state.patients,
            [patientId]: {
              ...state.patients[patientId],
              messages: mergeMessages,
              chatRoomId: action.chatRoomId,
              chatRoomName: action.chatRoomName,
            },
          },
        }
      }
      return state
    }
    case 'OPEN_CHAT_WINDOW': {
      const patients = state.patients
      const existsPatient = patients[patientId]
      if (existsPatient) {
        existsPatient.status = 'OPEN'
      }
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: existsPatient || { ...initialChatRoomState, status: 'OPEN' },
        },
      }
    }
    case 'CLOSE_CHAT_WINDOW':
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            status: 'CLOSE',
          },
        },
      }
    case 'SET_LATEST_MESSAGE_LIST':
      return {
        ...state,
        latestMessageList: action.latestMessageList,
      }
    case 'SET_ALL_UNREAD_COUNT':
      return {
        ...state,
        allUnreadCount: action.allUnreadCount,
      }
    case 'MESSAGE_ADDED':
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            messages: [...state.patients[patientId].messages, action.messages],
          },
        },
      }
    case 'MORE_MESSAGE_ADDED':
      return {
        ...state,
        patients: {
          ...state.patients,
          [patientId]: {
            ...state.patients[patientId],
            messages: [
              ...action.messages.sort((a, b) => a.createdAt > b.createdAt),
              ...state.patients[patientId].messages,
            ],
          },
        },
      }
    default:
      return state
  }
}

export default chatViewReducer
