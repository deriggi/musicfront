import React from 'react'
import ReactDOM from 'react-dom'
import { SearchInput, Text, Switch, ApplicationsIcon, MusicIcon, PersonIcon, Table, Pane } from 'evergreen-ui'

import 'style.css';
const API_BASE = 'http://localhost:8080';

class DataPuller extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      showArtists: true,
      showAlbums: true,
      showTracks: false,
      artists: []
    }
  }

  componentDidMount() {
    fetch(`${API_BASE}/hi`)
      .then(data => data.json())
      .then(asJson => console.log(asJson));
  }

  search(term) {
    if (term === undefined || term.length === 0) {
      return [];
    }
    fetch(`${API_BASE}/search/${term}`)
      .then(data => data.json())
      .then(asJson => this.setState({ artists: asJson }));
  }
  render() {

    let profiles = this.state.artists;
    let filtered = profiles.filter(
              p => this.state.showArtists && p.type == 'Artist' 
              || this.state.showAlbums && p.type == 'Album'
              || this.state.showTracks && p.type == 'Track')
    
    let searchResult = filtered.map(profile => {
      
    let icon;

    if(profile.type == 'Artist'){
      icon  =<PersonIcon color="muted" marginRight={16} />;
    }else if (profile.type == 'Album'){
      icon = <ApplicationsIcon color="muted" marginRight={16} />
    }else{
      icon = <MusicIcon color="muted" marginRight={16} />
    }

    let row = <Table.Row key={profile.id} isSelectable onSelect={() => alert(profile.name)}>
      <Table.TextCell>{profile.name === undefined ? profile.title : profile.name}</Table.TextCell>
      {/* <Table.TextCell>{profile.lastActivity}</Table.TextCell> */}
      <Table.TextCell >
        {icon}
      </Table.TextCell>
    </Table.Row>
    return row;
  })

    

    let pane =
      <Pane width={1000} margin="auto" >


        <Table.SearchHeaderCell
          height={20} margin={30}
          onChange={value => this.search(value)}
          placeholder='Search by artist, track, album...'
        />

        <Pane margin={30} marginBottom={80} >
          <Pane display='flex' float="left" >
            <Text margin={10} marginRight={5} size={400}>Artists</Text>
            <Switch
              margin={10}
              checked={this.state.showArtists}
              onChange={e => this.setState({ showArtists: e.target.checked })}

            />
          </Pane>

          <Pane display='flex' float="left" marginLeft={60}>
            <Text margin={10} marginRight={5} size={400}>Albums</Text>
            <Switch
              margin={10}
              checked={this.state.showAlbums}
              onChange={e => {
                this.setState({ showAlbums: e.target.checked })
                console.log("state is ", this.state);
              }}
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


        <Pane clearfix elevation={3} margin={12}>


          <Table margin="30">
            <Table.Head>
              <Table.TextHeaderCell>
                Name
        </Table.TextHeaderCell>
              {/* <Table.TextHeaderCell>
                Last Activity
        </Table.TextHeaderCell> */}
              <Table.TextHeaderCell>
                Type
        </Table.TextHeaderCell>
            </Table.Head>
            <Table.Body>
              {searchResult}
            </Table.Body>
          </Table>



        </Pane>
      </Pane>
    return pane
  }


  sayWhat(w) {
    console.log("i said what " + w);
  }



}
ReactDOM.render(
  <DataPuller />,
  document.getElementById('root')
)