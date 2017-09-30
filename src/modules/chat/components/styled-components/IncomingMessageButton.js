import styled from 'styled-components'
import { Icon, Badge } from 'antd'

export const StyIncomingMessageButton = styled(Icon)`
  position: relative;
  font-size: 20px;
  cursor: pointer;
`
export const StyBadge = styled(Badge)`
  .ant-badge-count {
    font-size: ${props => props.theme.general.size.small};
    font-weight: 100;
  }
`
