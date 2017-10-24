import styled from 'styled-components'
import React, { PropTypes } from 'react'
import { Tabs, Avatar } from 'antd'
import CommunicationView from '../../chat/containers/CommunicationView'

const Layer = ({ data }) => {
  const { patient, loading } = data
  if (loading) return <div />
  return (
    <Wrapper>
      <ProfileWrapper>
        <Avatar60 src={patient.avatar} />
        <PatientName>{patient.nickname}</PatientName>
      </ProfileWrapper>
      <TabsWrapper>
        <Tabs type="card">
          <TabPane tab="血糖自测表" key="1">
            血糖自测表
          </TabPane>
          <TabPane tab="管理方案" key="2">
            管理方案
          </TabPane>
          <TabPane tab="沟通记录" key="3">
            <CommunicationView />
          </TabPane>
        </Tabs>
      </TabsWrapper>
    </Wrapper>
  )
}
Layer.propTypes = {
  data: PropTypes.object,
}

export default Layer

const Wrapper = styled.div`
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  background-color: #fff;
  margin-left: 2px;
  min-width: 640px;
`

const ProfileWrapper = styled.div`
  flex: 0 0 240px;
  padding: 10px;
`

const TabsWrapper = styled.div`
  flex: 1 1 auto;
  > .ant-tabs > .ant-tabs-bar {
    margin-bottom: 0;

    .ant-tabs-nav-container {
      padding: 8px 2px;
      background-color: #1b9a82;
      height: 40px !important;

      .ant-tabs-tab {
        background-color: rgba(233, 235, 239, 0.4) !important;
        border: 1px solid rgba(233, 235, 239, 0) !important;
        color: #fff;

        &:hover {
          background-color: rgba(233, 235, 239, 0.3) !important;
        }
      }

      .ant-tabs-tab-active {
        background-color: #fff !important;
        color: #26344b !important;
        &:hover {
          background-color: #fff !important;
        }
      }
    }
  }
`

const TabPane = styled(Tabs.TabPane)`padding: 10px;`

const Avatar60 = styled(Avatar)`
  width: 60px !important;
  height: 60px !important;
  border-radius: 30px !important;
`

const PatientName = styled.div`
  font-size: 18px;
  color: #000;
`
