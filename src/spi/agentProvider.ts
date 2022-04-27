import { Injectable } from '@nestjs/common';
import { Agent, Id } from 'src/domain/Agent';
import { IAgentProvider } from 'src/domain/interfaces/IAgentProvider';
import * as fs from 'fs';

@Injectable()
export class AgentProvider implements IAgentProvider {
  private _agents: Agent[] = [];
  constructor() {
    fs.readFile(
      __dirname + '/../resources/agentsFixture.json',
      (err, rawData) => {
        if (err) {
          console.log(err);
          return;
        }
        const samplesFile = JSON.parse(rawData.toString());
        console.log();
        if (Array.isArray(samplesFile)) {
          samplesFile.forEach((sampleAgent) =>
            this._agents.push(
              new Agent(
                sampleAgent.id,
                sampleAgent.firstName,
                sampleAgent.lastName,
                sampleAgent.photo,
                sampleAgent.phone,
                sampleAgent.email
              ),
            ),
          );
        }
      },
    );
  }

  getAgentById(id: Id): Promise<Agent> {
    return Promise.resolve(this._agents.find((a) => a.get().id === id.get()));
  }
  getAgents(): Promise<Agent[]> {
    return Promise.resolve(this._agents);
  }
  createAgent(agent: Agent): void {
    this._agents.push(agent);
  }
  updateAgent(agent: Agent): void {
    const foundAgent = this._agents.find((a) => a.get().id === agent.get().id);
    if (!foundAgent)
      throw new Error(`Agent with id ${agent.get().id} was not found.`);
    this._agents = this._agents.filter((a) => a.get().id !== agent.get().id);
    this._agents.push(agent);
  }
}
