import { Agent } from '../Agent';

export interface PresentedAgent {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  photoUrl: string;
}

export interface IAgentPresenter {
  present(agent: Agent): void;
  get(): PresentedAgent;
}
