import { Inject, Injectable } from '@nestjs/common';
import { IAgentsListPresenter } from '../interfaces/IAgentsListPresenter';
import { IAgentProvider } from '../interfaces/IAgentProvider';

@Injectable()
export class GetAgents {
  private readonly _agentProvider: IAgentProvider;
  constructor(@Inject('IAgentProvider') agentProvider: IAgentProvider) {
    this._agentProvider = agentProvider;
  }
  async all(presenter: IAgentsListPresenter) {
    presenter.present(await this._agentProvider.getAgents());
  }
}
