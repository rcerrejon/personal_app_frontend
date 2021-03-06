import styled from 'styled-components'
import { device } from './config/styled.components'
import color from './constants/colors'

export const BtnYellow = styled.div`
  cursor: pointer;
  transition: all ease 0.3s;
  padding: 10px 20px;
  background-color: ${props => props.currTheme === 'dark' ? color.dark : color.grey2C_light};
  border-left: 4px solid ${props => props.theme.github};
  color: ${props => props.theme.github};

  &:hover, &:active {
    color: ${props => props.currTheme === 'dark' ? color.dark : color.grey2C_light};
    background-color: ${props => props.theme.github};
  }

  @media ${device.pc} {
    font-size: 25px;
  }
`

export const BtnYellowHome = styled.div`
  cursor: pointer;
  transition: all ease 0.3s;
  width: 150px;
  padding: 10px 17px;
  background-color: ${props => props.currTheme === 'dark' ? color.dark : color.grey2C_light};
  border-left: 4px solid ${props => props.theme.github};
  border-right: 4px solid ${props => props.currTheme === 'dark' ? props.theme.primary : props.theme.secondary};
  color: ${props => props.theme.github};
  font-size: 25px;

  &:hover, &:active {
    color: ${props => props.currTheme === 'dark' ? color.dark : color.grey2C_light};
    background-color: ${props => props.theme.github};
  }
`
