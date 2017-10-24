import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Redirect } from 'react-router-dom'

const LoginLayout = (props) => {
  const { from } = { from: { pathname: '/' } }
  if (localStorage.getItem('token')) {
    return <Redirect to={from} />
  }
  return (
    <LayoutWithStyle>
      <LeftSide>
        <TitleContainer>
          <Hostname />
          <ProjectName>iHealth 糖尿病共同照护 院外管理系统</ProjectName>
        </TitleContainer>
      </LeftSide>
      <RightSide>
        <StyledHeader />
        <ContentWithStyle>{props.children}</ContentWithStyle>
        <StyledFooter>Power by iHealth 北京爱和健康科技有限公司</StyledFooter>
      </RightSide>
    </LayoutWithStyle>
  )
}

const LayoutWithStyle = styled.div`
  background: url('./login_bg.jpg') no-repeat center center fixed;
  height: 100vh;
  background-size: cover;
  display: flex;
  flex-direction: row;
`

const LeftSide = styled.div`flex: 1 1 auto;`

const RightSide = styled.div`
  flex: 0 0 300px;
  background-color: rgba(0, 35, 64, ${props => props.theme.general.opacity.FAINT});

  display: flex;
  flex-direction: column;
`
const Hostname = styled.span`
  color: #ffffff;
  font-family: PingFangSC-Thin;
  font-weight: 100;
`

const ProjectName = styled.span`
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  text-align: center;
  color: #fff;
  margin-left: 10px;
`
const TitleContainer = styled.div`
  font-size: 54px;
  text-align: center;
  margin-top: 50vh;
`
const ContentWithStyle = styled.div`
  flex: 1 1 400px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const StyledFooter = styled.div`
  flex: 0 0 200px;
  font-family: STHeitiSC-Light;
  font-size: 12px;
  font-weight: 300;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
`
const StyledHeader = StyledFooter

LoginLayout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LoginLayout
