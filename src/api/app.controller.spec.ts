import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AgentProvider } from '../spi/agentProvider';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AgentProvider],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getAgentById('1234')).toBe('Hello World!');
    });
  });
});
