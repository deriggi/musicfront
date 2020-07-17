import React from 'react'
import ReactDOM from 'react-dom'
import { Button, Text, Autocomplete, TextInput, Table, Pane } from 'evergreen-ui'


class DataPuller extends React.Component{

  componentDidMount(){
    fetch("http://localhost:8080/hi")
    .then(data =>data.json())
    .then(asJson =>console.log(asJson));
  }

  render(){
  let profiles = [];
  profiles.push({name:"trey", lastActivity:new Date().toISOString(), ltv:3})
  profiles.push({name:"nadine", lastActivity:new Date().toISOString(), ltv:3})

  let pane = 
  <Pane clearfix>
    <Pane clearfix elevation={3}  margin={12}>
      

    <Table margin="30">
    <Table.Head>
      {/* <Table.SearchHeaderCell /> */}
      <Table.TextHeaderCell>
        Name
      </Table.TextHeaderCell>
      <Table.TextHeaderCell>
        Last Activity
      </Table.TextHeaderCell>
      <Table.TextHeaderCell>
        ltv
      </Table.TextHeaderCell>
    </Table.Head>
    <Table.Body height={240}>
      {profiles.map(profile => (
        <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
          <Table.TextCell>{profile.name}</Table.TextCell>
          <Table.TextCell>{profile.lastActivity}</Table.TextCell>
          <Table.TextCell isNumber>
            {profile.ltv}
          </Table.TextCell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>


    </Pane>
    
  </Pane>
  return pane
  }
   sayWhat(w){
    console.log("i said what " + w);
  }
  
}
ReactDOM.render(
  <DataPuller/>,
  document.getElementById('root')
)