import { Inject, Injectable } from '@nestjs/common';
import { UniqueIdService } from 'src/spi/uniqueIdService';
import { Agent } from '../Agent';
import { IAgentPresenter } from '../interfaces/IAgentPresenter';
import { IAgentProvider } from '../interfaces/IAgentProvider';
import { IUniqueIdService } from '../interfaces/IUniqueIdService';

@Injectable()
export class CreateAgent {
  private readonly _agentProvider: IAgentProvider;
  private readonly _uniqueIdService: IUniqueIdService;
  constructor(
    @Inject('IAgentProvider') agentProvider: IAgentProvider,
    @Inject('IUniqueIdService') uniqueIdService: UniqueIdService,
  ) {
    this._agentProvider = agentProvider;
    this._uniqueIdService = uniqueIdService;
  }
  async with(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    photoUrl: string,
    presenter: IAgentPresenter,
  ) {
    const agent = new Agent(
      this._uniqueIdService.generate(),
      firstName,
      lastName,
      photoUrl,
      phone,
      email,
    );
    this._agentProvider.createAgent(agent);
    presenter.present(agent);
  }
}
