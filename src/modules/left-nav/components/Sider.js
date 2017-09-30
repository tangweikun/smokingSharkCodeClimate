import React, { PropTypes } from 'react'
import { Layout, Menu, Icon } from 'antd'
import styled from 'styled-components'
import Logo from '../logo/logo.png'
// import styledTheme from '../../../themes/theme'

const { Sider } = Layout
const routerMap = {
  home: '',
  patient: 'patient',
  chat: 'chat',
  alert: 'alert',
}

const handledNavClick = ({ item, props }) => {
  const { history } = props
  if (routerMap[item.key] !== undefined && history.location.pathname !== routerMap[item.key]) {
    history.push(`/${routerMap[item.key]}`)
  }
}

const menus = [
  { label: '主页', type: 'home', icon: 'home' },
  { label: '聊天', type: 'chat', icon: 'message' },
  { label: '病人', type: 'patient', icon: 'team' },
  { label: '警告', type: 'alert', icon: 'bell' },
]

const SiderBar = (props) => {
  let selectedKeys = ['home']
  if (/\/patient/.test(props.match.path)) {
    selectedKeys = ['patient']
  } else if (/\/chat/.test(props.match.path)) {
    selectedKeys = ['chat']
  }
  return (
    <SiderContainer collapsed collapsedWidth={54}>
      <LogoIconContainer>
        <LogoIcon src={Logo} />
      </LogoIconContainer>
      <StyledMenu
        theme="dark"
        defaultSelectedKeys={['home']}
        selectedKeys={selectedKeys}
        style={{ width: '54px' }}
        onClick={item => handledNavClick({ item, props })}
      >
        {menus.map(menu => (
          <Menu.Item key={menu.type}>
            <StyledIcon type={menu.icon} />
            <span>{menu.label}</span>
          </Menu.Item>
        ))}
      </StyledMenu>
    </SiderContainer>
  )
}

SiderBar.propTypes = {
  match: PropTypes.object.isRequired,
}

const SiderContainer = styled(Sider)`
  z-index: ${props => props.theme.general.zIndex.MID};
  min-height: ${props => props.theme.general.height.minWithHeader};
  background-color: #253135 !important;
`
const LogoIconContainer = styled.div`
  width: 54px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const LogoIcon = styled.img`
  width: 20px;
  height: auto;
`
const StyledIcon = styled(Icon)`
  font-size: 20px !important;
  margin-left: -8px !important;
  line-height: 54px !important;
`
const StyledMenu = styled(Menu)`
  background-color: unset !important;
  color: rgba(255, 255, 255, 0.5);
  .ant-menu-item {
    height: 54px !important;
    color: rgba(255, 255, 255, 0.5);
  }
  .ant-menu-item-selected {
    color: rgba(255, 255, 255, 1);
    background-color: unset !important;
  }
`

export default SiderBar
