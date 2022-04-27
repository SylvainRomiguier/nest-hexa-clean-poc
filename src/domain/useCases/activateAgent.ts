import { Injectable, Inject } from "@nestjs/common";
import { Id } from "../Agent";
import { IAgentPresenter } from "../interfaces/IAgentPresenter";
import { IAgentProvider } from "../interfaces/IAgentProvider";

@Injectable()
export class ActivateAgent {
  private readonly _agentProvider: IAgentProvider;
  constructor(@Inject('IAgentProvider') agentProvider: IAgentProvider) {
    this._agentProvider = agentProvider;
  }
  async for(id: string, presenter:IAgentPresenter) {
      const agent = await this._agentProvider.getAgentById(new Id(id));
      agent.activate();
      this._agentProvider.updateAgent(agent);
      presenter.present(agent);
  }
 }
