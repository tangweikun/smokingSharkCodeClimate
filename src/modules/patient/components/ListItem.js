import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import { LableWithStyle } from './styled-component'

const genderMap = {
  male: '男',
  female: '女',
}

const showPropertys = [
  { key: 'gender', getValue: o => genderMap[o] || '?' },
  {
    key: 'dateOfBirth',
    getValue: o => (o ? `${moment().diff(moment(o), 'years')}年` : '?'),
  },
  { key: 'diabetesType', getValue: o => o || '?' },
  {
    key: 'startOfIllness',
    getValue: o => (o ? `${moment().diff(moment(o), 'years')}年` : '?'),
  },
]

const ListItem = ({ patient, switchPatient }) => {
  if (!patient) return null
  return (
    <ItemContainer onClick={switchPatient}>
      <div style={{ display: 'table-row' }}>
        <Avatar src={patient.avatar} />
        <div style={{ display: 'table-cell', verticalAlign: 'bottom', paddingLeft: '10px' }}>
          <InlineDiv>
            <FullName>{patient.nickname}</FullName>
            {showPropertys.map(property => (
              <InlineDiv key={property.key}>
                {property.key !== 'gender' && <LineSpace>|</LineSpace>}
                <LableWithStyle>{property.getValue(patient[property.key])}</LableWithStyle>
              </InlineDiv>
            ))}
          </InlineDiv>
        </div>
      </div>
    </ItemContainer>
  )
}

ListItem.propTypes = {
  patient: PropTypes.object.isRequired,
  switchPatient: PropTypes.func,
}

const ItemContainer = styled.div`
  padding: 10px 15px;
  cursor: pointer;
  border-bottom: solid 1px rgba(255, 255, 255, 0.05);
  display: table;
  color: #1c2528;
`
const Avatar = styled.img`
  width: 35px;
  height: 35px;
  display: 'table-cell'
  border-radius: 50%;
  vertical-align: bottom;
`
const InlineDiv = styled.div`
  display: inline-block;
  vertical-align: super;
`
const FullName = styled.div`
  margin: 0 10px 0 0;
  vertical-align: super;
  font-size: 14px;
`

const LineSpace = styled.div`
  display: inline-block;
  height: 13px;
  width: 6px;
  margin: 2px 2px 2px 6px;
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #9b9b9b;
`

export default ListItem
