import { Module } from '@nestjs/common';
import { AppController } from './api/app.controller';
import { AgentPresenter } from './api/presenters/agentPresenter';
import { AgentsListPresenter } from './api/presenters/agentsListPresenter';
import { CreateAgent } from './domain/useCases/createAgent';
import { GetAgent } from './domain/useCases/getAgent';
import { GetAgents } from './domain/useCases/getAgents';
import { UpdateAgent } from './domain/useCases/updateAgent';
import { AgentProvider } from './spi/agentProvider';
import { UniqueIdService } from './spi/uniqueIdService';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: 'IAgentProvider',
      useClass: AgentProvider,
    },
    {
      provide: 'IAgentPresenter',
      useClass: AgentPresenter,
    },
    {
      provide: 'IAgentsListPresenter',
      useClass: AgentsListPresenter,
    },
    {
      provide: 'IUniqueIdService',
      useClass: UniqueIdService,
    },
    GetAgent,
    GetAgents,
    CreateAgent,
    UpdateAgent,
  ],
})
export class AppModule {}
