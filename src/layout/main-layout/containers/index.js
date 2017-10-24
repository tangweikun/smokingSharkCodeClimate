import React from 'react'
// import { graphql } from 'react-apollo'
import { connect } from 'react-redux'
// import isEqual from 'lodash/isEqual'
// import { getUserInfo, queryUser } from '../actions'
import { getUserInfo } from '../actions'

import MainLayoutComponent from '../components'

class MainLayoutContainer extends React.Component {
  static propTypes = {
    // getUserInfo: PropTypes.func.isRequired,
    // data: PropTypes.object.isRequired,
  }
  componentWillReceiveProps(nextProps) {
    // const { me, loading } = nextProps.data
    // if (!loading && !isEqual(nextProps.data, this.props.data)) {
    //   nextProps.getUserInfo(me)
    // }
    console.log(nextProps, getUserInfo, '=====>>>>')
  }
  render() {
    return <MainLayoutComponent {...this.props} />
  }
}

const MainLayout = connect(null, {
  getUserInfo,
})(MainLayoutContainer)

// const MainLayout = connect(null, {
//   getUserInfo,
// })(
//   graphql(queryUser, {
//     options: () => ({
//       variables: {
//         userId: '66728d10dc75bc6a43052036',
//       },
//     }),
//   })(MainLayoutContainer),
// )

export default MainLayout
