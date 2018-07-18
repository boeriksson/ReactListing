import React from 'react'
import styled from 'styled-components'

import arrowDown from './arrow-down.svg'
import cross from './cross.svg'

const StyledButton = styled.div`
  width: 1px;
  wite-space: nowrap;
  width: 20px;
  background-repeat: no-repeat;
  background-position: center; 
  cursor: pointer;
  
  &.up {
    background-image: url(${arrowDown});
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }
  
  &.down {
    background-image: url(${arrowDown})
  }
  
  &.delete {
    background-image: url(${cross})
  }
`

export default ({ onClick, type }) => (
    <StyledButton className={type} onClick={onClick}/>
)
