import { connect } from 'react-redux'
import Component from '../components/AddCommButton'
import { popupEditor } from '../actions'

export default connect(null, { popupEditor })(Component)
