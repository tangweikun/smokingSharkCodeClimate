import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Layout } from 'antd'
import { Redirect } from 'react-router-dom'
// import isEmpty from 'lodash/isEmpty'
import SiderBar from '../../../modules/left-nav/containers/Sider'
import ModalContainer from '../../../modules/modal/containers'
// import IncomingMessageButton from '../../../modules/chat/containers/IncomingMessageButton'

const MainLayout = (props) => {
  const token = localStorage.getItem('token')
  const from = { pathname: '/login' }
  // props.data.refetch()
  if (!token) {
    localStorage.removeItem('token')
    return <Redirect to={from} />
  }

  return (
    <StyledLayout className="ant-layout-has-sider">
      <SiderBar {...props} />
      <Layout>
        <StyledHeader>
          <HospitalName>iHealth 糖尿病共同照护</HospitalName>
          <SystemName>院外管理系统</SystemName>
        </StyledHeader>
        <StyledContent>{props.children}</StyledContent>
        <StyledFooter>Power by iHealth 北京爱和健康科技有限公司</StyledFooter>
      </Layout>
      <ModalContainer />
    </StyledLayout>
  )
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  // data: PropTypes.object.isRequired,
  // history: PropTypes.object.isRequired,
}

export default MainLayout

const { Header, Content, Footer } = Layout
const StyledLayout = styled(Layout)`height: 100vh;`
const StyledHeader = styled(Header)`
  background: ${props => props.theme.general.color.PRIMARY} !important;
  padding: 0;
  height: 56px !important;
  line-height: 56px !important;
  font-size: 14px;
  padding-left: 19px;
  font-weight: bold;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
`
const StyledContent = styled(Content)`
  width: 100%;
  background: #e9ebef;
  display: flex;
`
const StyledFooter = styled(Footer)`
  padding: 3px 50px !important;
  text-align: center;
  border-top: 1px solid #cfcfcf;
`

const HospitalName = styled.div`
  flex: 0 0 auto;
  color: #fff;
  font-weight: lighter;
`

const SystemName = styled.div`
  flex: 0 0 auto;
  color: #fff;
  &:before {
    content: '-';
    margin: 5px;
  }
`

// const RightSideContainer = styled.div`
//   flex: 1 1 auto;
//   display: flex;
//   flex-flow: row nowrap;
//   align-items: center;
//   justify-content: flex-end;
//   padding-right: 20px;
// `
