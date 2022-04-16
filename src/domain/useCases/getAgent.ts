import { Inject, Injectable } from '@nestjs/common';
import { Id } from '../Agent';
import { IAgentPresenter } from '../interfaces/IAgentPresenter';
import { IAgentProvider } from '../interfaces/IAgentProvider';

@Injectable()
export class GetAgent {
  private readonly _agentProvider: IAgentProvider;
  constructor(@Inject('IAgentProvider') agentProvider: IAgentProvider) {
    this._agentProvider = agentProvider;
  }
  async byId(id: Id, presenter: IAgentPresenter) {
    presenter.present(await this._agentProvider.getAgentById(id));
  }
}
