import { IGenerateUniqueId } from 'src/domain/interfaces/IGenerateUniqueId';
import { v4 as generate } from 'uuid';
export class UniqueIdService implements IGenerateUniqueId {
  generate(): string {
    return generate();
  }
}
