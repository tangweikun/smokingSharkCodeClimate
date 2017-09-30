import { connect } from 'react-redux'
import ChatBubbleComponent from '../components/ChatBubble'
import { openImage } from '../actions/chatView'

const mapStateToProps = (state, ownProps) => ({
  message: ownProps.message,
})

export default connect(mapStateToProps, { openImage })(ChatBubbleComponent)
