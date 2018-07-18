import React from 'react'
import styled from 'styled-components'

const StyledContainer = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  line-height: 24px;
  margin-bottom: 10px;
  
  position: relative;
  
  &:before {
    z-index: 1;
  }
  
  &:after {
    position: absolute;
    content: "";
    width: 100%;
    bottom: 0;
    left: 0;
    border-bottom: 1px solid #aaa;
    z-index: 1;
  }
`
const StyledTab = styled.li`
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  margin: 0 10px;
  padding: 0 10px;
  border: 1px solid #AAA;
  background: #CFCFCF;
  background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
  display: inline-block; 
  position: relative;
  z-index: 0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  cursor: pointer;
  
  &.selected {
    background: #fff;
    color: #000;
    z-index: 2;
    border-bottom-color: #fff;
  }
    
  &:before, &:after {
    position: absolute;
    bottom: -1px;
    width: 5px;
    height: 4px;
    content: " ";
    border: 1px solid #aaa;
  }
  
  &:before {
    left: -6px;
    border-bottom-right-radius: 6px;
    border-width: 0 1px 1px 0;
    box-shadow: 2px 0px 0 #CFCFCF;
  }
  
  &:after {
    right: -6px;
    border-bottom-left-radius: 6px;
    border-width: 0 0 1px 1px;
    box-shadow: -2px 0px 0 #CFCFCF;
  }
  
  &.selected:before {
    box-shadow: 2px 2px 0 #FFF;
  }
  &.selected:after {
    box-shadow: -2px 2px 0 #FFF;
  }
`

export default ({ tabData }) => (
    <StyledContainer>
        { tabData.map((tab, ix) =>
            <StyledTab key={ix} className={ tab.selected && 'selected'} onClick={tab.onClick}>{tab.label}</StyledTab>
        )}
    </StyledContainer>
)
