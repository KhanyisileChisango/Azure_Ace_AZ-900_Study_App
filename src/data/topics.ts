import type { Topic } from '../types';

export const topics: Topic[] = [
  {
    id: 'cloud-concepts',
    title: 'Describe cloud concepts',
    subtitle:
      'Understand what the cloud is, how it compares to on-premises, and the different ways to use it.',
    icon: 'Cloud',
    color: 'sky',
  },
  {
    id: 'azure-architecture',
    title: 'Describe Azure architecture and services',
    subtitle:
      'Explore the core services, compute, storage, and networking that make up Azure.',
    icon: 'Network',
    color: 'blue',
  },
  {
    id: 'azure-management',
    title: 'Describe Azure management and governance',
    subtitle:
      'Learn how to manage, monitor, secure, and govern your Azure resources.',
    icon: 'ShieldCheck',
    color: 'cyan',
  },
];

export const topicMap: Record<string, Topic> = Object.fromEntries(
  topics.map((t) => [t.id, t])
);
