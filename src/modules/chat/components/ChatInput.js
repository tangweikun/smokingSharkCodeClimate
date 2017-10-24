import React from 'react'
import PropTypes from 'prop-types'
import { Popover } from 'antd'
import MicRecorder from 'mic-recorder-to-mp3'
import {
  ChatInputContainer,
  ChatButtonsContainer,
  ChatInput,
  ChatAdditionButton,
  EmojiTable,
  EmojiButton,
} from './styled-components'
import emojis from '../constants/emoji'

class ChatInputControls extends React.Component {
  static propTypes = {
    sendTextMessage: PropTypes.func.isRequired,
    sendAudioMessage: PropTypes.func.isRequired,
    sendImageMessage: PropTypes.func.isRequired,
    // startAudioRecord: PropTypes.func.isRequired,
    // stopAudioRecord: PropTypes.func.isRequired,
    chatRoomId: PropTypes.string,
  }
  state = {
    messageInput: null,
    emojiSelectorVisible: false,
  }
  componentWillMount() {
    this.recorder = new MicRecorder({ bitRate: 128 })
  }
  startAudioRecord() {
    this.recorder.start().then(() => {
      console.log('start audio recoerding')
    })
  }
  handleSend(messageType) {
    const { sendTextMessage, sendAudioMessage, sendImageMessage, chatRoomId } = this.props
    switch (messageType) {
      case 'TEXT':
        sendTextMessage({
          chatRoomId,
          text: this.messageInput.refs.input.value,
        })
        break
      case 'IMAGE': {
        sendImageMessage({
          chatRoomId,
          base64EncodedImageData: this.state.imageData,
        })
        break
      }
      case 'AUDIO': {
        this.recorder
          .stop()
          .getMp3()
          .then(([buffer, blob]) => {
            const file = new File(buffer, 'audio.mp3', {
              type: blob.type,
              lastModified: Date.now(),
            })
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
              sendAudioMessage({
                chatRoomId,
                base64EncodedAudioData: reader.result,
              })
            }
          })
        break
      }
      default:
        console.log('message type is ', messageType)
    }
    this.messageInput.refs.input.value = ''
  }
  addEmoji(emoji) {
    if (this.messageInput) {
      this.messageInput.refs.input.value += emoji
    }
  }
  handleEmojiVisibleChange(emojiSelectorVisible) {
    this.setState({ emojiSelectorVisible })
  }
  render() {
    return (
      <ChatInputContainer>
        <ChatInput
          placeholder="输入消息后按回车键发送"
          innerRef={(x) => {
            this.messageInput = x
          }}
          onPressEnter={() => {
            this.handleSend('TEXT')
          }}
        />
        <ChatButtonsContainer>
          <ChatAdditionButton type="paper-clip" />
          <ChatAdditionButton
            type="customer-service"
            onMouseDown={() => this.startAudioRecord()}
            onMouseUp={() => {
              this.handleSend('AUDIO')
            }}
          />
          <label htmlFor="image">
            <ChatAdditionButton type="picture" />
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            capture="Camera"
            onChange={(e) => {
              const reader = new FileReader()
              reader.onload = (x) => {
                this.setState({ imageData: x.target.result })
                this.handleSend('IMAGE')
              }
              reader.readAsDataURL(e.target.files.item(0))
            }}
          />
          <Popover
            placement="topLeft"
            trigger="click"
            visible={this.state.emojiSelectorVisible}
            onVisibleChange={visible => this.handleEmojiVisibleChange(visible)}
            content={
              <EmojiTable>
                {emojis.map((emoji, index) => (
                  <EmojiButton
                    key={index} // eslint-disable-line react/no-array-index-key
                    onClick={() => {
                      this.addEmoji(emoji.key)
                      this.setState({ emojiSelectorVisible: false })
                    }}
                    title={emoji.key}
                    src={emoji.value}
                  />
                ))}
              </EmojiTable>
            }
          >
            <ChatAdditionButton type="smile-o" />
          </Popover>
        </ChatButtonsContainer>
      </ChatInputContainer>
    )
  }
}

export default ChatInputControls
