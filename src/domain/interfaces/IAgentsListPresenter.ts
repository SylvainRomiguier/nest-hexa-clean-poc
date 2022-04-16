import { Agent } from '../Agent';
import { PresentedAgent } from './IAgentPresenter';

export interface IAgentsListPresenter {
  present(agentsList: Agent[]): void;
  get(): PresentedAgent[];
}
