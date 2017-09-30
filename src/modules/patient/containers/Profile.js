// import React, { PropTypes } from 'react'
// import isEqual from 'lodash/isEqual'
// import get from 'lodash/get'
import { graphql, compose } from 'react-apollo'
import { connect } from 'react-redux'
import ProfileCom from '../components/Profile'
import { openChatRoom } from '../actions/profile'
// import queryPatientById, { openChatRoom } from '../actions/profile'
import { setActivePatient } from '../../left-nav/actions/patientList'
// import { withLoading } from '../../../common/withLoading'

const mapStateToProps = state => ({
  activedPatient: state.core.activedPatient,
  doctorName: state.core.userInfo.fullName,
})

// class ProfileCom extends React.Component {
//   static propTypes = {
//     activedPatient: PropTypes.object,
//     data: PropTypes.object,
//   }
//   shouldComponentUpdate(np) {
//     const { activedPatient: { patientId }, data: { me } } = this.props
//     console.log(me, np.data.me)
//     console.log(np.activedPatient.patientId, this.props.activedPatient.patientId)
//     return !isEqual(get(np, 'activedPatient.patientId'), patientId)
//   }
//   render() {
//     return <Component {...this.props} />
//   }
// }

// export default compose(
//   connect(mapStateToProps, {
//     openChatRoom,
//     setActivePatient,
//   }),
//   graphql(queryPatientById, {
//     options: props => ({
//       variables: {
//         patientId: props.activedPatient.patientId || props.patientId,
//       },
//     }),
//   }),
// )(ProfileCom)

export default compose(
  connect(mapStateToProps, {
    openChatRoom,
    setActivePatient,
  }),
)(ProfileCom)
