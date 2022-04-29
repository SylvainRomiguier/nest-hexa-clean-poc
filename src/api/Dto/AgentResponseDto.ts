import { PresentedAgent } from "src/domain/interfaces/IAgentPresenter";

export class AgentResponseDto {
    id: string;
    name: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    photoUrl: string;
    status:string;
    activationUrl: string;
    detailsUrl: string;
    constructor(agent: PresentedAgent, host: string) {
        this.id = agent.id;
        this.name = agent.name;
        this.firstName = agent.firstName;
        this.lastName = agent.lastName;
        this.phone = agent.phone;
        this.email = agent.email;
        this.photoUrl = agent.photoUrl;
        this.status = agent.status;
        switch(agent.status) {
            case "Activated":
                this.activationUrl = `${host}/agents/${agent.id}/deactivate`;
                break;
            case "Deactivated":
                this.activationUrl =  `${host}/agents/${agent.id}/activate`;
                break;
        };
        this.detailsUrl = `${host}/agents/${agent.id}`;
    }
}