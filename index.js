import React from 'react'
import ReactDOM from 'react-dom'
import { SearchInput, Text, Switch, Autocomplete, TickCircleIcon, Table, Pane } from 'evergreen-ui'

import 'style.css';

class DataPuller extends React.Component{

  constructor(props){
      super(props)
      this.state = {
        showArtists:false, 
        showAlbums:false, 
        showTracks:false,
        artists:[]}
  }

  componentDidMount(){
    fetch("http://localhost:8080/hi")
    .then(data =>data.json())
    .then(asJson =>console.log(asJson));
  }

  search(term){
    fetch(`http://localhost:8080/term/${term}`)
    .then(data =>data.json())
    .then(asJson =>this.setState({ artists : asJson }));
  }
  render(){
    
    let profiles = this.state.artists;


    // profiles.push({id:1, name:"trey", lastActivity:new Date().toISOString(), ltv:3})
    // profiles.push({id:2, name:"nadine", lastActivity:new Date().toISOString(), ltv:3})
    // profiles.filter

    let pane = 
    <Pane  width={1000} margin="auto" >


<Table.SearchHeaderCell
      height={20} margin={30}
    onChange={value => this.search(value)}
    placeholder='Search by artist, track, album...'
  />

<Pane  margin={30} marginBottom={80} >
        <Pane  display='flex' float="left" >
          <Text  margin={10} marginRight={5} size={400}>Artists</Text>       
          <Switch  
            margin={10}
            checked={this.state.showArtists}
            onChange={e => this.setState({ showArtists: e.target.checked })}
          />
        </Pane>

        <Pane  display='flex' float="left" marginLeft={60}>
          <Text margin={10} marginRight={5} size={400}>Albums</Text>      
          <Switch  
            margin={10}
            checked={this.state.showAlbums}
            onChange={e => this.setState({ showAlbums: e.target.checked })}
          />
        </Pane>

        <Pane display='flex' float="left" marginLeft={60}>
          <Text margin={10} marginRight={5} size={400}>Tracks</Text>      
          <Switch  
            margin={10}
            checked={this.state.showTracks}
            onChange={e => this.setState({ showTracks: e.target.checked })}
          />
        </Pane>

      </Pane>


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
      <Table.Body>
        {this.state.artists.map(profile => (
          <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
            <Table.TextCell>{profile.name}</Table.TextCell>
            <Table.TextCell>{profile.lastActivity}</Table.TextCell>
            <Table.TextCell >
            <TickCircleIcon color="success" marginRight={16} />
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