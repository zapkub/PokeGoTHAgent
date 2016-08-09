import * as React from 'react';
import * as fetch from 'isomorphic-fetch';
import { connect } from 'react-redux';

import * as MapActions from '../actions/map.actions';
import { MapState } from '../reducers/map.reducer';
import { IAgentInfo, ICatchablePokemon} from '../../server/observer';

const styles = require('../styles/main.scss');

interface IPokeMapPropsType {
  agents?: IAgentInfo[];
  pokemons?: ICatchablePokemon[];
  reloadPokemonList?(): void;
}
class PokeMapComponent extends React.Component<IPokeMapPropsType, any> {
  private map: google.maps.Map;
  componentDidMount(): void {
        this.map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 13.730125096725232, lng: 100.53884983062744},
          scrollwheel: false,
          zoom: 17,
        });
        this.props.reloadPokemonList();
  }
  componentWillUpdate(nextProps: IPokeMapPropsType): void {

    nextProps.agents.map(item => {
      const location = new google.maps.LatLng(item.info.location.coords.latitude, item.info.location.coords.longitude);
      return new google.maps.Marker({
        position: location,
        map: this.map,
      });
    });

    nextProps.pokemons.map (item => {
      return new google.maps.Marker({
        position: new google.maps.LatLng(item.Latitude, item.Longitude),
        icon: item.detail.img,
        map: this.map,
      });
    });
  }
  render(): JSX.Element {
    return (<div>
      <div className={styles.map} id='map'> </div>
    </div>);
  }
};
const mapStoreToProps = (state, ownProps: IPokeMapPropsType) => {
  const map = state.map as MapState;
  const agents = map.agents;
  const pokemons = [];

  agents.map( (item, key) => {
      return item.catchablePokemon.map ( item => {
        pokemons.push(item);
      });
  });

  return {
    agents,
    pokemons,
  };
};
const mapDispatchToProps = (dispatch) => ({
  reloadPokemonList: () => {
    dispatch(MapActions.reloadPokemonInfo());
  },
});
const PokeMap = connect<{}, {}, {}>(mapStoreToProps, mapDispatchToProps)(PokeMapComponent);
export {PokeMap};
