import React from 'react'
import { Input } from 'reactstrap'
import styled from 'styled-components'

class SelectComponent extends React.Component {
  render(){
    return(
      <div style={{minWidth:'40%'}} >
        <Select
         placeholder='search...'
        />
        <div>

        </div>
      </div>
    )
  }
}

export default SelectComponent

const Select =  styled(Input)`
  border-radius:20px 20px;
  height:40px;
  &:hover{
    box-shadow: 0px 1.5px 7px 0px rgba(134,117,117,0.75)
  }
`
