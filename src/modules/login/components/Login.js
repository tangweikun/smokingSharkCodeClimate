import React, { PropTypes } from 'react'
import styled from 'styled-components'
import { Form, Input, Icon } from 'antd'
import { withApollo } from 'react-apollo'
import { isNumber } from '../../common/utils'

const FormItem = Form.Item

const handleSubmit = (props) => {
  props.form.validateFields((err, fields) => {
    if (err) return
    const { mobile, password } = fields
    if (mobile === '12312312300' && password === '123123') {
      localStorage.setItem('token', 'Bearer: JKDSJFIGOLSJDOFJ')
      props.history.push('/')
    } else {
      props.form.setFieldsValue({
        errorShow: '用户名或者密码不对，请重新输入',
      })
    }

    // props.client.query({
    //   query: gql`
    //     query DoctorLogin (
    //       $mobile: PhoneNumber!
    //       $password: String!
    //     ) {
    //         jwtForHealthCareProfessionalWithPassword
    //         (
    //           mobile: $mobile, password: $password
    //         )
    //     }`,
    //   variables: {
    //     mobile,
    //     password,
    //   },
    // }).then((result) => {
    //   const { data: { jwtForHealthCareProfessionalWithPassword } } = result
    //   if (jwtForHealthCareProfessionalWithPassword) {
    //     localStorage.setItem('token', `Bearer: ${jwtForHealthCareProfessionalWithPassword}`)
    //     props.history.push('/')
    //   }
    // }).catch((error) => {
    //   console.log(error)
    //   props.form.setFieldsValue({
    //     errorShow: '用户名或者密码不对，请重新输入',
    //   })
    // })
  })
}

const Login = (props) => {
  const { getFieldDecorator, getFieldValue } = props.form
  return (
    <LoginContainer>
      <HospitalName>共同照护</HospitalName>
      <SystemName>院外管理系统</SystemName>
      <Form>
        <FormItem>
          {getFieldDecorator('mobile', {
            rules: [
              { required: true, message: '请输入手机号码！' },
              {
                validator: (rule, value, callback) => {
                  if (isNumber(value, 11)) {
                    callback()
                  } else {
                    callback('手机号为11位有效数字')
                  }
                },
              },
            ],
          })(<InputWithStyle prefix={<IconWithStyle type="phone" />} placeholder="手机号" />)}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码！' }],
          })(
            <InputWithStyle
              prefix={<IconWithStyle type="lock" />}
              type="password"
              placeholder="密码"
            />,
          )}
        </FormItem>
      </Form>
      {getFieldDecorator('errorShow')(<StyledError>{getFieldValue('errorShow')}</StyledError>)}
      <LoginBtn onClick={() => handleSubmit(props)}>登录</LoginBtn>
    </LoginContainer>
  )
}

Login.propTypes = {
  form: PropTypes.object.isRequired,
}

const WrappedNormalLoginForm = Form.create()(Login)

export default withApollo(WrappedNormalLoginForm)

const LoginBtn = styled.div`
  height: 40px;
  background-color: #ffffff;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
  font-size: 18px;
  color: #00408a;
  font-family: STHeitiSC;
  line-height: 40px;
  cursor: pointer;
`
const LoginContainer = styled.div`width: 220px;`

const InputWithStyle = styled(Input)`
  input::-webkit-input-placeholder {
    color: #ffffff;
    font-family: STHeitiSC;
  }
  .ant-input {
    border: 1px solid #ffffff;
    background-color: rgba(0, 0, 0, 0.2);
    color: #ffffff;
    padding-left: 30px !important;
  }
  .ant-input-prefix > .anticon {
    color: #666;
  }
`

const IconWithStyle = styled(Icon)`
  font-size: 16px;
  color: #ffffff;
`

const StyledError = styled.p`
  font-size: 14px;
  color: rgba(255, 0, 0, 0.7);
  margin: 5px;
`

const HospitalName = styled.div`
  font-family: 'PingFang SC', 华文细黑, 微软雅黑, sans-serif;
  color: #fff;
  font-size: 52px;
  font-weight: 300;
  text-align-last: justify;
`

const SystemName = styled.div`
  font-size: 24px;
  color: #fff;
  text-align-last: justify;
  margin-bottom: 20px;
`
