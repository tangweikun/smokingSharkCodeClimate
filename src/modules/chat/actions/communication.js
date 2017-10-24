import React from 'react'
import Editor from '../containers/CommunicationEditor'

export const popupEditor = ({ record }) => (dispatch) => {
  dispatch({
    type: 'MODAL_SHOW',
    title: '编辑沟通记录',
    isShowModal: true,
    content: <Editor record={record} />,
    width: 500,
  })
}
