import { Inject, Injectable } from '@nestjs/common';
import { Agent } from '../Agent';
import { IAgentPresenter } from '../interfaces/IAgentPresenter';
import { IAgentProvider } from '../interfaces/IAgentProvider';
import { IGenerateUniqueId } from '../interfaces/IGenerateUniqueId';

@Injectable()
export class CreateAgent {
  constructor(
    @Inject('IAgentProvider')
    private readonly agentProvider: IAgentProvider,
    @Inject('IUniqueIdService')
    private readonly uniqueIdService: IGenerateUniqueId,
  ) {}
  async with(
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    photoUrl: string,
    presenter: IAgentPresenter,
  ) {
    const agent = new Agent(
      this.uniqueIdService.generate(),
      firstName,
      lastName,
      photoUrl,
      phone,
      email,
    );
    this.agentProvider.createAgent(agent);
    presenter.present(agent);
  }
}
