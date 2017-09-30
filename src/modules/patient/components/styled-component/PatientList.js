import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Input, Tabs } from 'antd'

const Search = Input.Search

export const PatientListHeader = ({ handlePatientsSearch }) => (
  <Header>
    <SearchWithStyle placeholder="患者姓名搜索" onChange={e => handlePatientsSearch(e.target.value)} />
  </Header>
)

PatientListHeader.propTypes = {
  handlePatientsSearch: PropTypes.func.isRequired,
}

export const LableWithStyle = styled.span`
  opacity: 0.5;
  font-family: PingFangSC;
  font-size: 14px;
  color: #1c2528;
`
export const PatientListContainer = styled.div`
  flex: 0 0 280px;
  background-color: #ffffff;
  font-size: 12px;
  font-family: PingFangSC;
  color: #ffffff;
  overflow: scroll;
`
export const TabsWithStyle = styled(Tabs)`
  .ant-tabs-bar {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    margin-bottom: 5px;
    margin-top: 4px;
  }
  .ant-tabs-nav-wrap {
    text-align: center;
  }
`
const SearchWithStyle = styled(Search)`
  width: 140px !important;
  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.87);
    font-family: PingFangSC-Regular;
  }
  .ant-input {
    width: 140px;
    height: 24px;
    border-radius: 4px;
    border: solid 1px rgba(255, 255, 255, 0.54);
    color: #ffffff;
    background-color: #627784;
  }
  .ant-input-suffix {
    color: #ffffff;
  }
`
export const PatientListDetail = styled.div`
  flex: 1 1 auto;
  background-color: #ffffff;
  font-size: 12px;
  font-family: PingFangSC;
  overflow: scroll;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-align: start;
`
export const PatientListHomePage = styled.div`
  flex: 1 1 auto;
  background-color: #ffffff;
  font-size: 12px;
  font-family: PingFangSC;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  padding: 20px 10px;
  display: flex;
  background-color: #627784;
`
export const Logo = styled.img`
  width: 150px;
  margin: 20px;
`
export const SystemName = styled.div`
  font-size: 20px;
  color: ${props => props.theme.general.color.PRIMARY};
  width: 210px;
  text-align: center;
  justify-content: center;
`
