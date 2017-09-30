import { graphql, compose } from 'react-apollo'
import ChatInputComponent from '../components/ChatInput'
import {
  insertTextMessages,
  inserAudioMessages,
  inserImageMessages,
} from '../actions'

const ChatInputText = graphql(insertTextMessages, {
  props: ({ mutate }) => ({
    sendTextMessage({ chatRoomId, text }) {
      return mutate({
        variables: {
          userId: '66728d10dc75bc6a43052036',
          chatRoomId,
          text,
        },
      })
    },
  }),
})

const ChatInputAudio = graphql(inserAudioMessages, {
  props: ({ mutate }) => ({
    sendAudioMessage({ chatRoomId, base64EncodedAudioData }) {
      return mutate({
        variables: {
          userId: '66728d10dc75bc6a43052036',
          chatRoomId,
          base64EncodedAudioData,
        },
      })
    },
  }),
})

const ChatInputImage = graphql(inserImageMessages, {
  props: ({ mutate }) => ({
    sendImageMessage({ chatRoomId, base64EncodedImageData }) {
      return mutate({
        variables: {
          userId: '66728d10dc75bc6a43052036',
          chatRoomId,
          base64EncodedImageData,
        },
      })
    },
  }),
})

export default compose(
  ChatInputAudio,
  ChatInputText,
  ChatInputImage,
)(ChatInputComponent)
