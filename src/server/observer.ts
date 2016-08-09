
import * as _ from 'lodash';
const PokemonGO = require('pokemon-go-node-api');

export interface IAgent {
  id: string;
  password: string;
  location: {
    type: string;
    name: string;
    coords: {
      latitude: number;
      longitude: number;
    }
  };
}
export class AgentInfo {
  nearByPokemon: INearByPokemon[];
  agentInfo: IAgent;
}
export interface IAgentsCallback {
  receiveAgentInfo(data: AgentInfo);
}
export interface INearByPokemon {
  DistanceMeters: any;
  EncounterId: {
    high: number;
    low: number;
    unsigned: boolean;
  };
  PokedexNumber: number;
}
export class ObserverAgent {
  public pokemonCallback: Function;
  private pokeio: any;
  constructor(info: IAgent) {
    this.pokeio = new PokemonGO.Pokeio();
    this.pokeio.init(info.id, info.password, info.location, 'ptc', this.agentCallback.bind(this));
  }
  nearByPokemonCallback (nearBy: INearByPokemon[]): void {
    console.log(nearBy);
    const filtered = _.uniqBy(nearBy, (item) => {
      return item.EncounterId.high + item.EncounterId.low;
    });
    console.log(filtered);
  }
  spawnPointCallback (spawnPoint: any[]): void {
    
  }
  agentCallback(err): void {
    if (err) { throw err; }
    const heartBeat = () => {

      this.pokeio.Heartbeat((err, hb) => {
        if (err) { console.log(err); }
        const location = this.pokeio.GetLocationCoords();
        const pokemons = [];
        hb.cells.map(item => {
          item.NearbyPokemon.map(
            item => {
              pokemons.push(item);
            }
          );
          // if (item.SpawnPoint.length > 0 ){
          //   this.spawnPointCallback(item.SpawnPoint);
          // }
        });
        this.nearByPokemonCallback(pokemons);
      });
    };

    heartBeat();
    setInterval(heartBeat, 10000);
  }
}
