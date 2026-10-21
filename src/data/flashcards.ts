import type { Flashcard } from '../types';

export const flashcards: Flashcard[] = [
  // Cloud concepts
  {
    id: 'fc-cloud',
    topicId: 'cloud-concepts',
    front: 'Cloud computing',
    back: 'Delivering computing services over the internet on demand, with pay-as-you-go pricing.',
  },
  {
    id: 'fc-iaas',
    topicId: 'cloud-concepts',
    front: 'IaaS',
    back: 'Infrastructure as a Service — you rent servers, storage, and networking and manage the OS and apps yourself.',
  },
  {
    id: 'fc-paas',
    topicId: 'cloud-concepts',
    front: 'PaaS',
    back: 'Platform as a Service — a managed platform where you deploy apps without managing the underlying servers.',
  },
  {
    id: 'fc-saas',
    topicId: 'cloud-concepts',
    front: 'SaaS',
    back: 'Software as a Service — finished software accessed through a browser, fully managed by the provider.',
  },
  {
    id: 'fc-public',
    topicId: 'cloud-concepts',
    front: 'Public cloud',
    back: 'Cloud resources owned by a provider and shared over the internet by many customers.',
  },
  {
    id: 'fc-private',
    topicId: 'cloud-concepts',
    front: 'Private cloud',
    back: 'Cloud resources used by a single organization, offering more control and privacy.',
  },
  {
    id: 'fc-hybrid',
    topicId: 'cloud-concepts',
    front: 'Hybrid cloud',
    back: 'A combination of public and private cloud that lets data and apps move between them.',
  },
  {
    id: 'fc-capex',
    topicId: 'cloud-concepts',
    front: 'CapEx',
    back: 'Capital expenditure — large upfront spending on physical assets like servers.',
  },
  {
    id: 'fc-opex',
    topicId: 'cloud-concepts',
    front: 'OpEx',
    back: 'Operational expenditure — ongoing, usage-based spending, like a utility bill.',
  },
  {
    id: 'fc-elasticity',
    topicId: 'cloud-concepts',
    front: 'Elasticity',
    back: 'The ability to scale resources up or down quickly as demand changes.',
  },

  // Azure architecture & services
  {
    id: 'fc-region',
    topicId: 'azure-architecture',
    front: 'Azure region',
    back: 'A set of datacenters deployed within a defined geographic area, connected by a low-latency network.',
  },
  {
    id: 'fc-az',
    topicId: 'azure-architecture',
    front: 'Availability zone',
    back: 'A physically separate datacenter group within a region, with independent power, cooling, and networking.',
  },
  {
    id: 'fc-region-pair',
    topicId: 'azure-architecture',
    front: 'Region pair',
    back: 'Two nearby Azure regions that back each other up for disaster recovery.',
  },
  {
    id: 'fc-vm',
    topicId: 'azure-architecture',
    front: 'Azure Virtual Machine',
    back: 'An IaaS service that runs a full operating system in the cloud, giving you full OS-level control.',
  },
  {
    id: 'fc-appservice',
    topicId: 'azure-architecture',
    front: 'Azure App Service',
    back: 'A managed PaaS platform for hosting web and mobile applications without managing servers.',
  },
  {
    id: 'fc-functions',
    topicId: 'azure-architecture',
    front: 'Azure Functions',
    back: 'A serverless compute service that runs small pieces of code on demand.',
  },
  {
    id: 'fc-blob',
    topicId: 'azure-architecture',
    front: 'Azure Blob Storage',
    back: 'A storage service for unstructured data such as images, videos, and documents.',
  },
  {
    id: 'fc-files',
    topicId: 'azure-architecture',
    front: 'Azure Files',
    back: 'A fully managed file share service accessible via standard protocols.',
  },
  {
    id: 'fc-vnet',
    topicId: 'azure-architecture',
    front: 'Virtual Network (VNet)',
    back: 'A private network in Azure that lets resources communicate securely with each other.',
  },
  {
    id: 'fc-lb',
    topicId: 'azure-architecture',
    front: 'Load balancer',
    back: 'A service that distributes incoming network traffic across multiple servers for availability.',
  },
  {
    id: 'fc-expressroute',
    topicId: 'azure-architecture',
    front: 'ExpressRoute',
    back: 'A dedicated private connection between your on-premises network and Azure.',
  },

  // Azure management & governance
  {
    id: 'fc-subscription',
    topicId: 'azure-management',
    front: 'Azure subscription',
    back: 'The billing and access boundary — every Azure resource belongs to one subscription.',
  },
  {
    id: 'fc-rg',
    topicId: 'azure-management',
    front: 'Resource group',
    back: 'A container that holds related Azure resources for a solution for easier management.',
  },
  {
    id: 'fc-mg',
    topicId: 'azure-management',
    front: 'Management group',
    back: 'A container above subscriptions that lets you apply policies across many subscriptions at once.',
  },
  {
    id: 'fc-rbac',
    topicId: 'azure-management',
    front: 'RBAC',
    back: 'Role-Based Access Control — manages who can access and manage Azure resources, using roles like Owner, Contributor, and Reader.',
  },
  {
    id: 'fc-owner',
    topicId: 'azure-management',
    front: 'Owner role',
    back: 'Full access to all resources, including the ability to assign access to others.',
  },
  {
    id: 'fc-contributor',
    topicId: 'azure-management',
    front: 'Contributor role',
    back: 'Can create and manage resources but cannot assign access to others.',
  },
  {
    id: 'fc-reader',
    topicId: 'azure-management',
    front: 'Reader role',
    back: 'Can view resources but cannot create or modify them.',
  },
  {
    id: 'fc-policy',
    topicId: 'azure-management',
    front: 'Azure Policy',
    back: 'A service that enforces organizational rules and compliance on resources.',
  },
  {
    id: 'fc-blueprints',
    topicId: 'azure-management',
    front: 'Azure Blueprints',
    back: 'Bundles policies, roles, and templates into a repeatable package for consistent environments.',
  },
  {
    id: 'fc-pricing-calc',
    topicId: 'azure-management',
    front: 'Azure Pricing Calculator',
    back: 'A tool that estimates the cost of planned Azure resources before you build them.',
  },
  {
    id: 'fc-cost-mgmt',
    topicId: 'azure-management',
    front: 'Azure Cost Management',
    back: 'A service that tracks spending, sets budgets, and alerts you as you approach limits.',
  },
  {
    id: 'fc-tags',
    topicId: 'azure-management',
    front: 'Tags',
    back: 'Key-value labels on resources that organize costs and management by metadata like team or project.',
  },
  {
    id: 'fc-monitor',
    topicId: 'azure-management',
    front: 'Azure Monitor',
    back: 'Collects metrics and logs from resources so you can see performance and set alerts.',
  },
];
