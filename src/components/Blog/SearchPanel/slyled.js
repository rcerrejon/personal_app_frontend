import styled from 'styled-components'
import { device } from '../../../config/styled.components'
import color from '../../../constants/colors'

export const BtnSearch = styled.div`
  cursor: pointer;
  transition: all ease 0.3s;
  font-size: 18px;
  text-align: center;
  padding: 10px 20px;
  background-color: ${props => props.currTheme === 'dark' ? color.black : color.grey2C_light};
  border-left: 4px solid ${props => props.theme.github};
  color: ${props => props.theme.github};

  &:hover, &:active {
    color: ${props => props.currTheme === 'dark' ? color.black : color.grey2C_light};
    background-color: ${props => props.theme.github};
  }
`
