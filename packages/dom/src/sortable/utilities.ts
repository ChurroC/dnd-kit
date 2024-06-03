import type {Droppable, Draggable} from '@dnd-kit/dom';

import {SortableDroppable, SortableDraggable} from './sortable.js';

export function isSortable(
  element: Draggable | Droppable | null
): element is SortableDroppable<any> | SortableDraggable<any> {
  return (
    element instanceof SortableDroppable || element instanceof SortableDraggable
  );
}
