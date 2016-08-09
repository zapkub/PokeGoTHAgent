/// <reference path="../typings/index.d.ts" />
import config from './config';
import { ObserverAgent } from './server/observer';


const Agents: ObserverAgent[] = [];
config.agents.map(
  item => {
    Agents.push(new ObserverAgent(item));
  }
);

