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
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Id } from 'src/domain/Agent';
import { IAgentPresenter } from 'src/domain/interfaces/IAgentPresenter';
import { IAgentsListPresenter } from 'src/domain/interfaces/IAgentsListPresenter';
import { ActivateAgent } from 'src/domain/useCases/activateAgent';
import { CreateAgent } from 'src/domain/useCases/createAgent';
import { DeactivateAgent } from 'src/domain/useCases/deactivateAgent';
import { GetAgent } from 'src/domain/useCases/getAgent';
import { GetAgents } from 'src/domain/useCases/getAgents';
import { UpdateAgent } from 'src/domain/useCases/updateAgent';
import { AgentDto } from './Dto/AgentDto';
import { AgentResponseDto } from './Dto/AgentResponseDto';

@Controller('agents')
export class AppController {
  constructor(
    private readonly getAgent: GetAgent,
    private readonly getAgents: GetAgents,
    private readonly createAgent: CreateAgent,
    private readonly updateAgent: UpdateAgent,
    private readonly activateAgent: ActivateAgent,
    private readonly deactivateAgent: DeactivateAgent,
    @Inject('IAgentPresenter') private readonly agentPresenter: IAgentPresenter,
    @Inject('IAgentsListPresenter')
    private readonly agentsListPresenter: IAgentsListPresenter,
  ) {}

  @Get('/')
  async getAllAgents(@Req() request: Request): Promise<AgentResponseDto[]> {
    const host = `${request.protocol}://${request.get('Host')}`;
    await this.getAgents.all(this.agentsListPresenter);
    return this.agentsListPresenter
      .get()
      .map((agent) => new AgentResponseDto(agent, host));
  }

  @Get('/:id')
  async getAgentById(
    @Param('id') id: string,
    @Req() request: Request,
  ): Promise<AgentResponseDto | undefined> {
    try {
      const host = `${request.protocol}://${request.get('Host')}`;
      await this.getAgent.byId(new Id(id), this.agentPresenter);
      return new AgentResponseDto(this.agentPresenter.get(), host);
    } catch (e) {
      return undefined;
    }
  }

  @Post('/')
  async createAgentWith(
    @Req() request: Request,
    @Body() agentDto: AgentDto,
  ): Promise<AgentResponseDto> {
    try {
      const host = `${request.protocol}://${request.get('Host')}`;
      await this.createAgent.with(
        agentDto.firstName,
        agentDto.lastName,
        agentDto.phone,
        agentDto.email,
        agentDto.photoUrl ?? '',
        this.agentPresenter,
      );
      return new AgentResponseDto(this.agentPresenter.get(), host);
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
    @Req() request: Request,
    @Param('id') id: string,
    @Body() agentDto: AgentDto,
  ): Promise<AgentResponseDto> {
    try {
      const host = `${request.protocol}://${request.get('Host')}`;
      await this.updateAgent.with(
        id,
        agentDto.firstName,
        agentDto.lastName,
        agentDto.phone,
        agentDto.email,
        agentDto.photoUrl ?? '',
        this.agentPresenter,
      );
      return new AgentResponseDto(this.agentPresenter.get(), host);
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

  @Post('/:id/activate')
  async activateAgentById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<AgentResponseDto> {
    try {
      const host = `${request.protocol}://${request.get('Host')}`;
      await this.activateAgent.for(id, this.agentPresenter);
      return new AgentResponseDto(this.agentPresenter.get(), host);
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

  @Post('/:id/deactivate')
  async deactivateAgentById(
    @Req() request: Request,
    @Param('id') id: string,
  ): Promise<AgentResponseDto> {
    try {
      const host = `${request.protocol}://${request.get('Host')}`;
      await this.deactivateAgent.for(id, this.agentPresenter);
      return new AgentResponseDto(this.agentPresenter.get(), host);
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
