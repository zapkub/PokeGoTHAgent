const pokedex = require('../resource/pokedex.json');
import * as fetch from 'isomorphic-fetch';


export interface IPokemonInfo {
  name: string;
  id: string | number;
  type: string;
}
export const getPokemonById = (Id: string | number): IPokemonInfo => {
  if (! pokedex[Id + ''] ) {
    return {name: 'not found', id: Id, type: ''};
  }
  return pokedex[Id + ''];
};
