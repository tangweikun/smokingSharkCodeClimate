import React, { PropTypes } from 'react'
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import pinyin from 'pinyin-es5'
import debounce from 'lodash/debounce'
import {
  PatientListContainer,
  PatientListHeader,
  PatientListDetail,
  Logo,
  SystemName,
  PatientListHomePage } from './styled-component'
import ListItem from './ListItem'
import Profile from './Profile'
import queryPatients from '../actions/patientList'
import SearchPatientList from './SearchPatientList'

class PatientList extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    loading: PropTypes.boolean,
    history: PropTypes.func,
    patientId: PropTypes.string,
  }
  state = {
    searchPatientList: [],
    isSearch: false,
  }
  handlePatientClick = (patient) => {
    const { history } = this.props
    history.push(`/patient/${patient._id}`)
  }
  handlePatientsSearch = debounce((searchInput) => {
    const patientList = get(this.props, 'data.patients', [])
    const patients = patientList.filter(o => o.nickname)
    let searchPatientList = []
    if (searchInput) {
      const filterPatients = patients.filter(o => o.nickname.indexOf(searchInput) !== -1)
      searchPatientList = sortBy(filterPatients, [
        (o) => {
          const pinyinArray = pinyin(o.nickname, { style: pinyin.STYLE_NORMAL })
          return pinyinArray.reduce((prev, curr) => prev + curr, '')
        },
      ])
    }
    this.setState({ searchPatientList, isSearch: !!searchInput })
  }, 500)

  render() {
    const { loading } = this.props.data
    let patientList = []
    if (!loading) {
      patientList = get(this.props, 'data.patients', [])
    }
    const { searchPatientList, isSearch } = this.state
    return (
      <div style={{ display: 'flex', flex: '1' }}>
        <PatientListContainer>
          <PatientListHeader handlePatientsSearch={this.handlePatientsSearch} {...this.props} />
          {isSearch && !!patientList.length ? (
            <SearchPatientList
              patientList={searchPatientList}
              handlePatientClick={this.handlePatientClick}
            />
          ) : (
            patientList.map(patient => (
              <ListItem
                key={patient._id}
                patient={patient}
                switchPatient={() => this.handlePatientClick(patient)}
              />
            ))
          )}
        </PatientListContainer>
        { this.props.patientId
          ? (<PatientListDetail>
            <Profile {...this.props} />
          </PatientListDetail>)
          : (<PatientListHomePage>
            <Logo src={'./logo_lg.png'} />
            <SystemName>iHealth 糖尿病共同照护院外管理系统</SystemName>
          </PatientListHomePage>)
        }
      </div>
    )
  }
}
export default graphql(queryPatients)(PatientList)
