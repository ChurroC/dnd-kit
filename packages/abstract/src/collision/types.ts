import type {DragOperation} from '../manager';
import type {Draggable, Droppable, UniqueIdentifier} from '../nodes';

export enum CollisionPriority {
  Lowest,
  Low,
  Medium,
  High,
  Highest,
}

export interface Collision {
  id: UniqueIdentifier;
  priority: CollisionPriority | number;
  value: number;
}

export type Collisions = Collision[];

export interface CollisionDetectorInput<
  T extends Draggable = Draggable,
  U extends Droppable = Droppable,
> {
  droppable: U;
  dragOperation: DragOperation<T, U>;
}

export type CollisionDetector = <
  T extends Draggable = Draggable,
  U extends Droppable = Droppable,
>(
  input: CollisionDetectorInput<T, U>
) => Collision | null;