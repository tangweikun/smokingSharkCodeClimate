import React from 'react'
import PropTypes from 'prop-types'
import { Modal, Button } from 'antd'
import styled from 'styled-components'

const modalButtons = (modal, closeModal) => {
  const { cancel, save, btns } = modal
  const actionBtns = []
  if (cancel) {
    actionBtns.push(
      <Button icon={cancel.icon || 'close'} onClick={cancel.fn || closeModal}>
        {cancel.label}
      </Button>,
    )
  }
  if (save) {
    actionBtns.push(
      <Button onClick={save.fn} type="primary" icon="save">
        {save.label}
      </Button>,
    )
  }
  if (btns) {
    btns.forEach((element) => {
      actionBtns.push(<Button onClick={element.fn}>{element.label}</Button>)
    })
  }
  return actionBtns
}
const Layout = ({ modal, closeModal }) => {
  const actionBtns = modalButtons(modal, closeModal)

  return (
    <ModalWithStyle
      visible={modal.isShowModal}
      title={modal.title}
      onCancel={closeModal}
      footer={actionBtns.length ? <FooterContainer>{actionBtns}</FooterContainer> : null}
      width={modal.width}
      maskClosable={modal.maskClosable}
      {...modal}
    >
      {modal.content}
    </ModalWithStyle>
  )
}

Layout.propTypes = {
  modal: PropTypes.object.isRequired,
  closeModal: PropTypes.func.isRequired,
}

const FooterContainer = styled.div`padding: 10px 30px;`
const ModalWithStyle = styled(Modal)`
  max-width: calc(100vw - 100px);
  .ant-modal-header {
    margin: 0px 16px;
  }
`
export default Layout
