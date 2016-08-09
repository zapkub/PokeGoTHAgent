
import * as _ from 'lodash';
import * as Pokedex from './pokedex';
const PokemonGO = require('pokemon-go-node-api');

export interface IAgent {
  id: string;
  password: string;
  paths?: {latitude: number; longitude: number}[];
  location: {
    type: string;
    name: string;
    coords: {
      latitude: number;
      longitude: number;
    },
  };
}

export interface IAgentInfo {
  nearByPokemon?: INearByPokemon[];
  catchablePokemon?: ICatchablePokemon[];
  info: {
    id: string;
    location: {
      name: string;
      coords: {
        latitude: number;
        longitude: number;
      };
    };
  };
}

export interface IAgentsCallback {
  receiveAgentInfo(data: IAgentInfo): void;
}
export interface INearByPokemon {
  DistanceMeters: any;
  EncounterId: {
    high: number;
    low: number;
    unsigned: boolean;
  };
  PokedexNumber: number;
  detail: any;
}
export interface ICatchablePokemon {
  spawnPointId: string;
  PokedexTypeId: number;
  Latitude: number;
  Longitude: number;
  ExpirationTimeMs: any;
  detail: any;
}

class LatLng {
  type: string = 'coords';
  latitude: number;
  longitude: number;
  constructor(lat, lng) {
    this.latitude = lat;
    this.longitude = lng;
  }
}


export class ObserverAgent {
  public managerCallback: IAgentsCallback;
  public info: IAgent;
  private pokeio: any;
  private destination: LatLng[];
  private currentDestinationIndex = 0;
  constructor(info: IAgent) {
    this.info = info;
    this.pokeio = new PokemonGO.Pokeio();
    this.pokeio.init(info.id, info.password, info.location, 'ptc', this.agentCallback.bind(this));
  }
  private nearByPokemonCallback (nearBy: INearByPokemon[], catchable: any[]): void {

    const filtered = _.uniqBy(nearBy, (item) => {
      return item.EncounterId.high + item.EncounterId.low;
    });
    if (this.managerCallback) {
      this.managerCallback.receiveAgentInfo({
        nearByPokemon: filtered,
        catchablePokemon: catchable,
        info: this.info,
      });
    }

  }
  private spawnPointCallback (spawnPoint: any[]): void {

  }
  private agentCallback(err): void {
    if (err) { throw err; }
    if (this.info.paths) {
      this.destination = this.info.paths.map(item => new LatLng(item.latitude, item.longitude));
      setInterval(this.walk.bind(this), 5000);
    }
    const heartBeat = () => {

      this.pokeio.Heartbeat((err, hb) => {
        if (err) { console.log(err); }
        const location = this.pokeio.GetLocationCoords();
        const pokemons = [];
        const catchable = [];
        hb.cells.map(item => {
          item.NearbyPokemon.map(
            item => {
              item.detail = Pokedex.getPokemonById(item.PokedexNumber - 1);
              pokemons.push(item);
            }
          );
          item.MapPokemon.map(item => {
            item.detail = Pokedex.getPokemonById((item as ICatchablePokemon).PokedexTypeId - 1);
            catchable.push(item);
          });
        });

        this.nearByPokemonCallback(pokemons, catchable);
      });
    };

    // heartBeat();
    setInterval(heartBeat, 10000);
  }
  private walk (): void {
    let current = this.pokeio.GetLocationCoords() as LatLng;
    console.log('start at ');
    console.log(current);
    let dest = this.destination[this.currentDestinationIndex];
    console.log('to ');
    console.log(dest);

    let deltaX = dest.latitude - current.latitude;
    let deltaY = dest.longitude - current.longitude;


    this.movingToPosition(new LatLng(
        current.latitude + (deltaX / 60),
        current.longitude + (deltaY / 60)
    )).then(
      (nextPosition) => {
         this.info.location.coords = nextPosition;
      });



  }
  private async movingToPosition(dest: LatLng): Promise<LatLng> {
    console.log('begin move');

    return new Promise<LatLng>((fulfil, reject) => {
      const coords = {
         coords: {latitude: dest.latitude,
         longitude: dest.longitude},
         type: 'coords',
      };
      console.log(coords);
      this.pokeio.SetLocation(coords, (err, coordinates) => {
        if ( err ) { console.log(err); reject(err); };
        fulfil(coordinates);
      });
    });
  };
}
