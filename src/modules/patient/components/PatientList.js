import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import get from 'lodash/get'
import sortBy from 'lodash/sortBy'
import pinyin from 'pinyin-es5'
import debounce from 'lodash/debounce'
import Downshift from 'downshift'
import {
  PatientListContainer,
  PatientListDetail,
  Header,
  Logo,
  SystemName,
  PatientListHomePage,
} from './styled-component'
import ListItem from './ListItem'
import Profile from './Profile'
import queryPatients from '../actions/patientList'

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
    console.log('searching', patientList.length)
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
    return (
      <div style={{ display: 'flex', flex: '1' }}>
        <PatientListContainer>
          <BasicAutocomplete
            items={patientList}
            onChange={selectedItem => console.log(selectedItem)}
            handlePatientClick={this.handlePatientClick}
            loading={this.props.data.loading}
          />
        </PatientListContainer>
        {this.props.patientId ? (
          <PatientListDetail>
            <Profile {...this.props} />
          </PatientListDetail>
        ) : (
          <PatientListHomePage>
            <Logo src={'./logo_lg.png'} />
            <SystemName>iHealth 糖尿病共同照护院外管理系统</SystemName>
          </PatientListHomePage>
        )}
      </div>
    )
  }
}
export default graphql(queryPatients)(PatientList)

const SelectedPatient = ({ patientId }) =>
  patientId ? (
    <PatientListDetail>
      <Profile patientId={patientId} />
    </PatientListDetail>
  ) : (
    <PatientListHomePage>
      <Logo src={'./logo_lg.png'} />
      <SystemName>iHealth 糖尿病共同照护院外管理系统</SystemName>
    </PatientListHomePage>
  )

SelectedPatient.propTypes = {
  patientId: PropTypes.string,
}

function BasicAutocomplete({ items, onChange, handlePatientClick, loading }) {
  return (
    <Downshift onChange={onChange}>
      {({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => (
        <div>
          <Header>
            <input {...getInputProps({ placeholder: '查询结果: ' })} />
          </Header>
          {loading ? (
            <div>loading...</div>
          ) : (
            <SearchResults
              inputValue={inputValue}
              items={items}
              handlePatientClick={handlePatientClick}
            />
          )}
        </div>
      )}
    </Downshift>
  )
}
const SearchResults = ({ inputValue, items, handlePatientClick }) => (
  <div style={{ border: '1px solid #ccc' }}>
    {items
      .filter(
        i =>
          inputValue && i.nickname && i.nickname.toLowerCase().includes(inputValue.toLowerCase()),
      )
      .map(patient => (
        <ListItem
          key={patient._id}
          patient={patient}
          switchPatient={() => handlePatientClick(patient)}
        />
      ))}
  </div>
)
