import * as fetch from 'isomorphic-fetch';
import { IGetAgent } from '../../models/restful';
export const RELOAD_POKEMON_LIST = 'RELOAD_POKEMON_LIST';
export const reloadPokemonInfo = () => async (dispatch) => {
  const response = await fetch('/api/agent');
  const agentInfo: IGetAgent = await response.json();
  console.log(agentInfo);
  dispatch({type: RELOAD_POKEMON_LIST, payload: agentInfo.data });
};
