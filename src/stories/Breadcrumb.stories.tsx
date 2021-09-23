import React from 'react';
// import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Story, Meta } from '@storybook/react/types-6-0';

import Breadcrumb, { BreadcrumbItem, BreadcrumbProps } from '../components/Breadcrumb';

export default {
  title: 'Example/Breadcrumb',
  component: Breadcrumb,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as Meta<typeof Breadcrumb>;

const Template: Story<BreadcrumbProps> = (args) => <Breadcrumb {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: [
    <BreadcrumbItem href="/">Home</BreadcrumbItem>,
    <BreadcrumbItem href="/page">Page</BreadcrumbItem>,
    <BreadcrumbItem>Current</BreadcrumbItem>,
  ],
};
