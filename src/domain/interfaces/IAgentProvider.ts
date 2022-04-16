import { Agent, Id } from '../Agent';

export interface IAgentProvider {
  getAgentById(id: Id): Promise<Agent | null>;
  getAgents(): Promise<Agent[]>;
  createAgent(agent: Agent): void;
  updateAgent(agent: Agent): void;
}
