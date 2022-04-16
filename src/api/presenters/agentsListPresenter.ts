import { Injectable } from '@nestjs/common';
import { Agent } from 'src/domain/Agent';
import { PresentedAgent } from 'src/domain/interfaces/IAgentPresenter';
import { IAgentsListPresenter } from 'src/domain/interfaces/IAgentsListPresenter';
import { AgentPresenter } from './agentPresenter';

@Injectable()
export class AgentsListPresenter implements IAgentsListPresenter {
  _value: PresentedAgent[];
  present(agentsList: Agent[]): void {
    const agentPresenter = new AgentPresenter();
    this._value = agentsList.map((agent) => {
      agentPresenter.present(agent);
      return agentPresenter.get();
    });
  }
  get(): PresentedAgent[] {
    return this._value;
  }
}
