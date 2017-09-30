import { gql } from 'react-apollo'

export const insertTextMessages = gql`
  mutation SendTextChatMessage($userId: String!, $chatRoomId: ID!, $text: String!) {
    sendNeedleTextChatMessage(userId: $userId, chatRoomId: $chatRoomId, text: $text) {
      text
    }
  }
`
export const inserAudioMessages = gql`
  mutation SendAudioChatMessage($userId: String!, $chatRoomId: ID!, $base64EncodedAudioData: String!) {
    sendNeedleAudioChatMessage(userId: $userId, chatRoomId: $chatRoomId, base64EncodedAudioData: $base64EncodedAudioData) {
      audioUrl
    }
  }
`
export const inserImageMessages = gql`
  mutation SendImageChatMessage($userId: String!, $chatRoomId: ID!, $base64EncodedImageData: String!) {
    sendNeedleImageChatMessage(userId: $userId, chatRoomId: $chatRoomId, base64EncodedImageData: $base64EncodedImageData) {
      imageUrl
    }
  }
`
