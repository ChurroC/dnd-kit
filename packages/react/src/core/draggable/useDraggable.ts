import {useCallback} from 'react';
import type {Data} from '@dnd-kit/abstract';
import {Draggable} from '@dnd-kit/dom';
import type {DraggableInput} from '@dnd-kit/dom';
import {useComputed, useOnValueChange} from '@dnd-kit/react/hooks';
import {getCurrentValue, type RefOrValue} from '@dnd-kit/react/utilities';

import {useInstance} from '../hooks/useInstance.js';

export interface UseDraggableInput<T extends Data = Data>
  extends Omit<DraggableInput<T>, 'handle' | 'element'> {
  handle?: RefOrValue<Element>;
  element?: RefOrValue<Element>;
}

export function useDraggable<T extends Data = Data>(
  input: UseDraggableInput<T>
) {
  const {disabled, id, sensors} = input;
  const handle = getCurrentValue(input.handle);
  const element = getCurrentValue(input.element);
  const draggable = useInstance(
    (manager) => new Draggable({...input, handle, element}, manager)
  );
  const isDragSource = useComputed(() => draggable.isDragSource);

  useOnValueChange(id, () => (draggable.id = id));
  useOnValueChange(handle, () => (draggable.handle = handle));
  useOnValueChange(element, () => (draggable.element = element));
  useOnValueChange(disabled, () => (draggable.disabled = disabled === true));
  useOnValueChange(sensors, () => (draggable.sensors = sensors));
  useOnValueChange(
    input.feedback,
    () => (draggable.feedback = input.feedback ?? 'default')
  );

  return {
    get isDragSource() {
      return isDragSource.value;
    },
    handleRef: useCallback(
      (element: Element | null) => {
        draggable.handle = element ?? undefined;
      },
      [draggable]
    ),
    ref: useCallback(
      (element: Element | null) => {
        draggable.element = element ?? undefined;
      },
      [draggable]
    ),
  };
}
