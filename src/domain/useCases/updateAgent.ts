import { Inject, Injectable } from '@nestjs/common';
import { Agent } from '../Agent';
import { IAgentPresenter } from '../interfaces/IAgentPresenter';
import { IAgentProvider } from '../interfaces/IAgentProvider';

@Injectable()
export class UpdateAgent {
  private readonly _agentProvider: IAgentProvider;
  constructor(@Inject('IAgentProvider') agentProvider: IAgentProvider) {
    this._agentProvider = agentProvider;
  }
  async with(
    id: string,
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    photoUrl: string,
    presenter: IAgentPresenter,
  ) {
    const agent = new Agent(id, firstName, lastName, photoUrl, phone, email);
    this._agentProvider.updateAgent(agent);
    presenter.present(agent);
  }
}
