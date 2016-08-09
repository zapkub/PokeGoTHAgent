import { IAgentInfo } from '../server/observer';
declare interface IRestfulAPI<T> {
  data: T;
  code: number;
  err: string;
};


export interface IGetAgent extends IRestfulAPI<IAgentInfo[]> {};
