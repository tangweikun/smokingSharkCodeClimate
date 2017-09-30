import React, { PropTypes } from 'react'
import {
  Row,
  Col,
  Grid,
  Panel,
  PanelBody,
  PanelContainer,
  PanelHeader,
  PanelFooter,
  Button,
  Icon,
} from '@sketchpixy/rubix'
import MeasurementHistoryTable from './measurement-history-table.jsx'

export default class MeasurementHistory extends React.Component {
  getStyles() {
    return {
      plus: {
        float: 'right',
        textAlign: 'center',
        marginTop: '8px',
      },
    }
  }

  render() {
    const styles = this.getStyles()
    return (
      <PanelContainer controls={false}>
        <Panel>
          <PanelHeader className="bg-grayishgray">
            <Grid>
              <Row style={{ height: '50px' }}>
                <Col xs={12} className="fg-white">
                  <div style={{ float: 'left' }}>
                    <h4>血糖测量历史记录</h4>
                  </div>
                  <div
                    style={this.props.isEditing ? { display: 'none' } : styles.plus}
                  >
                    <Button
                      bsStyle="primary" inverse
                      onClick={() => this.props.startInsertBloodGlucoses()}
                    >
                      <Icon glyph="glyphicon-plus">添加记录</Icon>
                    </Button>
                  </div>
                </Col>
              </Row>
            </Grid>
          </PanelHeader>
          <PanelBody>
            <Grid>
              <Row>
                <Col xs={12}>
                  <MeasurementHistoryTable
                    treatmentHistory={this.props.treatmentHistory}
                    editBloodGlucoses={this.props.editBloodGlucoses}
                    insertBloodGlucoses={this.props.insertBloodGlucoses}
                    formData={this.props.formData}
                    isEditing={this.props.isEditing}
                    startInsertBloodGlucoses={this.props.startInsertBloodGlucoses}
                    deleteBloodGlucoses={this.props.deleteBloodGlucoses}
                    getMeasurementHistory={this.props.getMeasurementHistory}
                  />
                </Col>
              </Row>
            </Grid>
          </PanelBody>
          <PanelFooter>
            <Grid>
              <Row>
                <Col xs={12} className="text-center" />
              </Row>
            </Grid>
          </PanelFooter>
        </Panel>
      </PanelContainer>
    )
  }
}

MeasurementHistory.propTypes = {
  treatmentHistory: PropTypes.array,
  formData: PropTypes.object,
  editBloodGlucoses: PropTypes.func,
  insertBloodGlucoses: PropTypes.func,
  startInsertBloodGlucoses: PropTypes.func,
  isEditing: PropTypes.bool,
  getMeasurementHistory: PropTypes.func,
  deleteBloodGlucoses: PropTypes.func,
}
