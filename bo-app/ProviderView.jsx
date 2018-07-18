import React from 'react'
import ProviderModel from './ProviderModel'
import styled from 'styled-components'

import Tabs from './tabs'
import TableButton from './TableButton'

const StyledTable = styled.div`
  display: table;  
  width: 100%;
  font-size: 16px;
  border-collapse: collapse;
  font-family: Arial, Helvetica, sans-serif;
  
  & > div:first-child {   // Table header
    display: table-header-group;
    & > div {
        display: table-row;
        background: #CFCFCF;
        background: -moz-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: -webkit-linear-gradient(top, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        background: linear-gradient(to bottom, #dbdbdb 0%, #d3d3d3 66%, #CFCFCF 100%);
        border-bottom: 2px solid #000000;
        box-sizing: border-box;
        div {
          display: table-cell;
          color: #000000;
        }
    }
  }
  & > div {  // Table rows
    display: table-row-group;
    & > div {
      display: table-row;
      div {
        display: table-cell;
        border: 1px solid #cfcfcf;
        color: #5E5E5E;
        padding: 5px 4px;
        input {
          width: 98%;
        }
      }
    }
  }
`

const ProviderView = () => (
    <ProviderModel>
        {
            ({ providers, type, fetchProviders, updateProvider }) => {
                let methodKeyInput
                let methodNameInput
                const keyPress = (e) => {
                    if (e.key.toLowerCase() === 'enter') {
                        if (!!methodKeyInput.value && !!methodNameInput.value) {
                            updateProvider(
                                type,
                                'ADD',
                                { methodKey: methodKeyInput.value, methodName: methodNameInput.value })
                            methodKeyInput.value = ''
                            methodNameInput.value = ''
                            methodKeyInput.focus()
                        } else if (!methodNameInput.value) {
                            methodNameInput.focus()
                        } else {
                            methodKeyInput.focus()
                        }
                    }
                }
                const moveUp = methodKey => {
                    console.log('moveUp methodKey: ', methodKey);
                    const ix = providers.findIndex(provider => provider.methodKey === methodKey)
                    console.log('ix: ', ix);
                    if (ix > 0) {
                        console.log('providers1: ', providers);
                        const swapMethod = providers[ix - 1]
                        providers[ix - 1] = providers[ix]
                        providers[ix] = swapMethod
                        console.log('providers2: ', providers);
                    }

                }
                const tabData = [
                    {
                        label: '2-Plan',
                        onClick: () => fetchProviders('DEPOSITS', 'SE'),
                        selected: type === 'DEPOSITS'
                    },
                    {
                        label: '1.5-Plan',
                        onClick: () => fetchProviders('WITHDRAWALS', 'SE'),
                        selected: type === 'WITHDRAWALS'
                    }
                ]
                return (
                    <div>
                        <Tabs tabData={tabData}/>
                        <StyledTable>
                            <div>
                                <div>
                                    <div>Ix</div>
                                    <div>Method key</div>
                                    <div>Method name</div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div>
                            <div>
                                { providers.map((provider, ix) => (
                                    <div className="row" key={provider.methodKey}>
                                        <div>{ix}</div>
                                        <div>{provider.methodKey}</div>
                                        <div>{provider.methodName}</div>
                                        <TableButton type="up"
                                             onClick={ e => updateProvider(type, 'MOVEUP', { methodKey: provider.methodKey }) }>
                                        </TableButton>
                                        <TableButton type="down"
                                             onClick={ e => updateProvider(type, 'MOVEDOWN', { methodKey: provider.methodKey }) }>
                                        </TableButton>
                                        <TableButton type="delete"
                                              onClick={ e => updateProvider(type, 'DELETE', { methodKey: provider.methodKey }) }>
                                        </TableButton>
                                    </div>
                                )) }
                                <div>
                                    <div></div>
                                    <div>
                                        <input type="text" onKeyPress={keyPress}
                                            ref={(input) => methodKeyInput = input}/>
                                    </div>
                                    <div>
                                        <input type="text" onKeyPress={keyPress}
                                                ref={(input) => methodNameInput = input}/>
                                    </div>
                                    <div/>
                                    <div/>
                                    <div/>
                                </div>
                            </div>
                        </StyledTable>
                    </div>
                )
            }
        }
    </ProviderModel>
)

export default ProviderView
