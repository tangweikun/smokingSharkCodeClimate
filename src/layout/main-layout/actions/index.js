import { gql } from 'react-apollo'

export const queryUser = gql`
  query QueryUser($userId: ID!) {
    healthCareProfessional(id: $userId) {
      _id
      nickname
      role
    }
  }
`

export const getUserInfo = userInfo =>
  (dispatch) => {
    dispatch({
      type: 'GET_USER_INFO',
      userInfo,
    })
  }
