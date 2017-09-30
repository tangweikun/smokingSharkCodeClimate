import React from 'react'
import styled from 'styled-components'

const EmptyScreen = () => (
  <Content>
    <Logo src={'./logo_lg.png'} />
    <SystemName>iHealth 糖尿病共同照护院外管理系统</SystemName>
  </Content>
)

export default EmptyScreen

const Content = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const Logo = styled.img`
  width: 150px;
  align-items: center;
  justify-content: center;
  margin: 20px;
`
export const SystemName = styled.div`
  font-size: 20px;
  color: ${props => props.theme.general.color.PRIMARY};
  width: 210px;
  text-align: center;
  justify-content: center;
`
