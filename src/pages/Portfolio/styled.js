import styled from 'styled-components'
import { device } from '../../config/styled.components'

export const Btn = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  padding: 0px 10px;
  margin: 0 0 0 2px;
  background-color: ${props => props.active ? props.theme.primary : props.theme.dark};
  cursor: pointer;
  
  // @media ${device.pc} {
  //   display: none;
  // }

  &:hover{
    background-color: ${props => props.theme.primary};
  }
`
