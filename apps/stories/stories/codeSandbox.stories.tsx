import type {Meta, StoryObj} from '@storybook/react';
import {Sandpack} from '@codesandbox/sandpack-react';

// Change manager head to display none so we only use this for the iframe

function WoW(props: Parameters<typeof Sandpack>[0]) {
  return (
    <Sandpack
      template="react"
      customSetup={{
        dependencies: {
          '@dnd-kit/react': 'latest',
        },
      }}
      {...props}
    ></Sandpack>
  );
}

function Test(props: {name: string}) {
  return <div>{props.name ?? 'ww'}</div>;
}

const meta: Meta<typeof Test> = {
  title: 'CodeSandbox',
  component: () => {
    const urlParams = new URLSearchParams(document.location.search);
    const mockedParam = urlParams.get('data');
    return <Test name={mockedParam || 's'} />;
  },
  parameters: {
    query: {
      data: 'sdsddsdss',
    },
  },
};
export default meta;

export const DragHandle: StoryObj<typeof Test> = {
  render: () => {
    const urlParams = new URLSearchParams(document.location.search);
    const mockedParam = urlParams.get('data');
    return <Test name={mockedParam || 's'} />;
  },
};
