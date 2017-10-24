import React from 'react'
import { gql } from 'react-apollo'
import get from 'lodash/get'
import isArray from 'lodash/isArray'
import sumBy from 'lodash/sumBy'
import moment from 'moment'

export const queryMessages = gql`
  query Messages($patientId: ID!) {
    fetchOrCreateNeedleChatRoom(userId: $patientId) {
      _id
      __typename
      ... on NeedleChatRoom {
        _id
        __typename
        messages {
          _id
          __typename
          ... on NeedleTextMessage {
            sender {
              _id
            }
            text
          }
        }
      }
    }
  }
`

export const queryLatestMessages = gql`
  query LatestMessage($userId: ID!) {
    patients {
      _id
      nickname
      avatar
      needleChatRoom {
        _id
        lastSeenAt(userId: $userId)
        latestMessage {
          ... on NeedleTextMessage {
            text
            createdAt
          }
        }
        unreadMessageCount(userId: $userId)
      }
    }
  }
`

export const queryAllUnreadCount = gql`
  query AllLatestMessageUnreadCount($userId: ID!) {
    patients {
      needleChatRoom {
        _id
        unreadMessageCount(userId: $userId)
      }
    }
  }
`
export const subscriptionMessage = gql`
  subscription chatMessageAdded {
    chatMessageAdded {
      _id
      sender {
        _id
        __typename
      }
      __typename
      ... on NeedleTextMessage {
        text
      }
      ... on NeedleImageMessage {
        imageUrl
      }
      ... on NeedleAudioMessage {
        audioUrl
      }
      createdAt
      needleChatRoom {
        _id
      }
    }
  }
`

export const updateLastSeenAt = gql`
  mutation updateLastSeenAt($userId: String!, $chatRoomId: ID!) {
    updateLastSeenAt(userId: $userId, chatRoomId: $chatRoomId)
  }
`

export const openChatWindow = patientId => ({
  type: 'OPEN_CHAT_WINDOW',
  patientId,
})

export const updateChatRoom = args => ({
  type: 'UPDATE_CHAT_ROOM',
  ...args,
})

export const closeChatWindow = patientId => ({
  type: 'CLOSE_CHAT_WINDOW',
  patientId,
})

export const openLatestMessageList = data => (dispatch) => {
  const patients = []
  const teams = get(data, 'healthCareTeams')
  teams.forEach((team) => {
    const patientList = get(team, 'patients')
    if (isArray(patientList)) {
      patients.push(...patientList)
    }
  })
  // const patients = get(data, 'healthCareTeams[0].patients')
  const latestMessageList = patients.map(patient => ({
    patientId: get(patient, '_id'),
    name: get(patient, 'fullName'),
    avatar: get(patient, 'avatar'),
    gender: get(patient, 'boundDetails.gender') === 'MALE' ? '男' : '女',
    age: moment().year() - moment(get(patient, 'boundDetails.dateOfBirth')).year(),
    text: get(patient, 'boundDetails.chatRoom.latestMessage.text'),
    createdAt: get(patient, 'boundDetails.chatRoom.latestMessage.createdAt'),
    userType: get(patient, 'boundDetails.chatRoom.latestMessage.sender.__typename'),
    unreadMessageCount: get(patient, 'boundDetails.chatRoom.unreadMessageCount'),
  }))
  dispatch({
    type: 'SET_LATEST_MESSAGE_LIST',
    latestMessageList,
  })
}

export const getAllUnreadCount = data => (dispatch) => {
  let allUnreadCount = 0
  const teams = get(data, 'healthCareTeams')
  teams.forEach((team) => {
    allUnreadCount += sumBy(get(team, 'patients'), 'boundDetails.chatRoom.unreadMessageCount')
  })
  dispatch({
    type: 'SET_ALL_UNREAD_COUNT',
    allUnreadCount,
  })
}

export const messageAdded = (patientId, newMessage) => ({
  type: 'MESSAGE_ADDED',
  patientId,
  messages: newMessage,
})

export const fetchMoreMessages = (patientId, messages) => ({
  type: 'MORE_MESSAGE_ADDED',
  patientId,
  messages,
})

export const openImage = imageUrl => ({
  type: 'MODAL_SHOW',
  isShowModal: true,
  width: 'unset',
  content: <img alt="img" style={{ width: '100%' }} src={imageUrl} />,
})
