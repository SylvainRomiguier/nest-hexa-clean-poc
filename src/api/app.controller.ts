import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Id } from 'src/domain/Agent';
import {
  IAgentPresenter,
  PresentedAgent,
} from 'src/domain/interfaces/IAgentPresenter';
import { IAgentsListPresenter } from 'src/domain/interfaces/IAgentsListPresenter';
import { CreateAgent } from 'src/domain/useCases/createAgent';
import { GetAgent } from 'src/domain/useCases/getAgent';
import { GetAgents } from 'src/domain/useCases/getAgents';
import { UpdateAgent } from 'src/domain/useCases/updateAgent';
import { AgentDto } from './Dto/AgentDto';

@Controller('agents')
export class AppController {
  constructor(
    private readonly getAgent: GetAgent,
    private readonly getAgents: GetAgents,
    private readonly createAgent: CreateAgent,
    private readonly updateAgent: UpdateAgent,
    @Inject('IAgentPresenter') private readonly agentPresenter: IAgentPresenter,
    @Inject('IAgentsListPresenter')
    private readonly agentsListPresenter: IAgentsListPresenter,
  ) {}

  @Get('/')
  async getAllAgents(): Promise<PresentedAgent[]> {
    await this.getAgents.all(this.agentsListPresenter);
    return this.agentsListPresenter.get();
  }

  @Get('/:id')
  async getAgentById(
    @Param('id') id: string,
  ): Promise<PresentedAgent | undefined> {
    try {
      await this.getAgent.byId(new Id(id), this.agentPresenter);
      return this.agentPresenter.get();
    } catch (e) {
      return undefined;
    }
  }

  @Post('/')
  async createAgentWith(@Body() agentDto: AgentDto): Promise<PresentedAgent> {
    try {
      await this.createAgent.with(
        agentDto.firstName,
        agentDto.lastName,
        agentDto.phone,
        agentDto.email,
        agentDto.photoUrl ?? '',
        this.agentPresenter,
      );
      return this.agentPresenter.get();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: (e as Error).message,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  @Put('/:id')
  async updateAgentWith(
    @Param('id') id: string,
    @Body() agentDto: AgentDto,
  ): Promise<PresentedAgent> {
    try {
      await this.updateAgent.with(
        id,
        agentDto.firstName,
        agentDto.lastName,
        agentDto.phone,
        agentDto.email,
        agentDto.photoUrl ?? '',
        this.agentPresenter,
      );
      return this.agentPresenter.get();
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.SERVICE_UNAVAILABLE,
          error: (e as Error).message,
        },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }
}
