import { Injectable } from '@nestjs/common';
import { Agent } from 'src/domain/Agent';
import {
  IAgentPresenter,
  PresentedAgent,
} from 'src/domain/interfaces/IAgentPresenter';

@Injectable()
export class AgentPresenter implements IAgentPresenter {
  _value: PresentedAgent;
  present(agent: Agent): void {
    this._value = {
      id: agent.get().id,
      name: `${agent.get().firstName} ${agent.get().lastName.toUpperCase()}`,
      phone: agent.get().phone,
      email: agent.get().email,
      photoUrl: agent.get().photoUrl,
      firstName: agent.get().firstName,
      lastName: agent.get().lastName,
    };
  }
  get(): PresentedAgent {
    return this._value;
  }
}
