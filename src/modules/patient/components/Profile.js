import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { graphql } from 'react-apollo'
import { Avatar, Button } from 'antd'
import queryPatientById from '../actions/profile'

const PatientProfile = ({ history, data }) => {
  let avatar = ''
  let nickname = ''
  if (!data.loading) {
    avatar = data.patient ? data.patient.avatar : ''
    nickname = data.patient ? data.patient.nickname : 'test'
  }
  const openChatRoom = () => {
    history.push(`/chat/${data.patient._id}`)
  }
  return (
    <div>
      <Header>
        <AvatarZone>
          <Avatar size="large" src={avatar} />
        </AvatarZone>
        <Name>{nickname}</Name>
        <AdditionalZone>
          <Button type="primary" size="large" onClick={openChatRoom}>
            发消息
          </Button>
        </AdditionalZone>
      </Header>
    </div>
  )
}

PatientProfile.propTypes = {
  history: PropTypes.object,
  data: PropTypes.object,
}

const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  position: relative;
  color: #000000;
`

const AvatarZone = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 18px 10px 9px;
`
const Name = styled.div`
  font-weight: bold;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #253135;
  font-family: PingFangSC;
`

const AdditionalZone = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
`

// const CustomizeIcon = styled(Icon)`
//   font-size: ${props => props.theme.general.size.LARGER};
//   color: ${props => (props.isStarred ? '#0cc4bb' : '#979797')};
//   margin: 7px 8px;
//   cursor: pointer;
// `
export default graphql(queryPatientById, {
  options: props => ({
    variables: {
      patientId: props.patientId || props.patient._id,
    },
  }),
})(PatientProfile)
