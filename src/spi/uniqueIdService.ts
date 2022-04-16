import { IUniqueIdService } from 'src/domain/interfaces/IUniqueIdService';
import { v4 as generate } from 'uuid';
export class UniqueIdService implements IUniqueIdService {
  generate(): string {
    return generate();
  }
}
