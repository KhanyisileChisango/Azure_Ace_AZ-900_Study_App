import type { QuizQuestion } from '../types';

export const quizQuestions: QuizQuestion[] = [
  // ---------- CLOUD CONCEPTS ----------
  {
    id: 'q-cloud-1',
    topicId: 'cloud-concepts',
    question:
      'Which statement best describes a benefit of cloud computing compared to on-premises infrastructure?',
    options: [
      'You must purchase all hardware in advance',
      'You can scale resources up and down quickly based on demand',
      'You are responsible for all physical hardware maintenance',
      'You cannot access resources over the internet',
    ],
    answerIndex: 1,
    explanation:
      'A key benefit of the cloud is elasticity — you can scale resources up or down quickly as demand changes, without buying hardware.',
  },
  {
    id: 'q-cloud-2',
    topicId: 'cloud-concepts',
    question: 'Which cloud service model provides a finished application accessed through a browser?',
    options: ['IaaS', 'PaaS', 'SaaS', 'DaaS'],
    answerIndex: 2,
    explanation:
      'SaaS (Software as a Service) is fully finished software accessed through a browser or app, managed entirely by the provider.',
  },
  {
    id: 'q-cloud-3',
    topicId: 'cloud-concepts',
    question: 'What is an example of a PaaS service in Azure?',
    options: [
      'Azure Virtual Machines',
      'Azure App Service',
      'Azure Storage',
      'Microsoft 365',
    ],
    answerIndex: 1,
    explanation:
      'Azure App Service is a PaaS offering — you deploy your web app while Azure manages the underlying servers and operating system.',
  },
  {
    id: 'q-cloud-4',
    topicId: 'cloud-concepts',
    question: 'Which describes the consumption-based pricing model in the cloud?',
    options: [
      'You pay a fixed yearly fee regardless of usage',
      'You pay only for the resources you actually use',
      'You pay a large upfront cost for hardware',
      'You pay per device you own',
    ],
    answerIndex: 1,
    explanation:
      'In a consumption-based model, you pay only for the resources you use, similar to a utility bill.',
  },
  {
    id: 'q-cloud-5',
    topicId: 'cloud-concepts',
    question: 'What is a shared responsibility in the public cloud?',
    options: [
      'The provider handles all security and you do nothing',
      'You handle all hardware maintenance yourself',
      'The provider manages physical hardware; you manage your data and access',
      'Both you and the provider manage the physical datacenter',
    ],
    answerIndex: 2,
    explanation:
      'In the public cloud, the provider manages the physical datacenter and hardware, while you are responsible for your data, access, and how you configure the services.',
  },
  {
    id: 'q-cloud-6',
    topicId: 'cloud-concepts',
    question: 'Which deployment model combines public and private cloud resources?',
    options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Local cloud'],
    answerIndex: 2,
    explanation:
      'A hybrid cloud combines public and private cloud resources, allowing data and apps to move between them.',
  },

  // ---------- AZURE ARCHITECTURE & SERVICES ----------
  {
    id: 'q-arch-1',
    topicId: 'azure-architecture',
    question: 'What is an Azure region?',
    options: [
      'A single server in a datacenter',
      'A set of datacenters deployed within a defined geographic area',
      'A billing plan for customers',
      'A security policy for resources',
    ],
    answerIndex: 1,
    explanation:
      'An Azure region is a set of datacenters deployed within a defined geographic area, connected through a low-latency network.',
  },
  {
    id: 'q-arch-2',
    topicId: 'azure-architecture',
    question: 'How many availability zones does a region that supports them typically contain?',
    options: ['One', 'Two', 'Three or more', 'Ten'],
    answerIndex: 2,
    explanation:
      'Regions that support availability zones typically have a minimum of three separate zones for resilience.',
  },
  {
    id: 'q-arch-3',
    topicId: 'azure-architecture',
    question: 'Which Azure service is a fully managed platform for hosting web applications?',
    options: [
      'Azure Virtual Machines',
      'Azure App Service',
      'Azure Blob Storage',
      'Azure VPN Gateway',
    ],
    answerIndex: 1,
    explanation:
      'Azure App Service is a fully managed PaaS for hosting web and mobile applications without managing the underlying servers.',
  },
  {
    id: 'q-arch-4',
    topicId: 'azure-architecture',
    question: 'Which Azure service runs small pieces of code on demand without managing servers?',
    options: [
      'Azure Functions',
      'Azure App Service',
      'Azure Virtual Machines',
      'Azure Files',
    ],
    answerIndex: 0,
    explanation:
      'Azure Functions is a serverless compute service that runs code on demand, with Azure handling the infrastructure.',
  },
  {
    id: 'q-arch-5',
    topicId: 'azure-architecture',
    question: 'Which Azure storage service is best for storing large unstructured files like images and videos?',
    options: [
      'Azure Table Storage',
      'Azure Blob Storage',
      'Azure Disk Storage',
      'Azure Queue Storage',
    ],
    answerIndex: 1,
    explanation:
      'Azure Blob Storage is optimized for storing large unstructured data such as images, videos, and documents.',
  },
  {
    id: 'q-arch-6',
    topicId: 'azure-architecture',
    question: 'What is the primary purpose of an Azure Virtual Network (VNet)?',
    options: [
      'To store files in the cloud',
      'To provide a private network for Azure resources to communicate securely',
      'To bill customers for usage',
      'To encrypt data at rest',
    ],
    answerIndex: 1,
    explanation:
      'A VNet is a private network in Azure that lets resources communicate securely with each other and with on-premises networks.',
  },
  {
    id: 'q-arch-7',
    topicId: 'azure-architecture',
    question: 'Which Azure service provides a dedicated private connection to Azure from your on-premises network?',
    options: [
      'Azure VPN Gateway',
      'ExpressRoute',
      'Azure Load Balancer',
      'Azure DNS',
    ],
    answerIndex: 1,
    explanation:
      'ExpressRoute provides a dedicated, private connection between your on-premises network and Azure, with more reliability and lower latency than the public internet.',
  },
  {
    id: 'q-arch-8',
    topicId: 'azure-architecture',
    question: 'What does an Azure load balancer do?',
    options: [
      'Stores large amounts of data',
      'Distributes incoming network traffic across multiple servers',
      'Manages user passwords',
      'Encrypts data at rest',
    ],
    answerIndex: 1,
    explanation:
      'A load balancer distributes incoming traffic across multiple servers to improve availability and responsiveness.',
  },

  // ---------- AZURE MANAGEMENT & GOVERNANCE ----------
  {
    id: 'q-mgmt-1',
    topicId: 'azure-management',
    question: 'What is an Azure subscription?',
    options: [
      'A folder for storing files',
      'A billing and access boundary for Azure resources',
      'A type of virtual machine',
      'A security policy document',
    ],
    answerIndex: 1,
    explanation:
      'A subscription is the billing and access boundary — every Azure resource belongs to a subscription.',
  },
  {
    id: 'q-mgmt-2',
    topicId: 'azure-management',
    question: 'What does a resource group do in Azure?',
    options: [
      'It hosts websites',
      'It groups related resources for a solution for easier management',
      'It stores blobs',
      'It encrypts traffic',
    ],
    answerIndex: 1,
    explanation:
      'A resource group is a container that holds related resources for a solution, making it easier to manage, monitor, and bill them together.',
  },
  {
    id: 'q-mgmt-3',
    topicId: 'azure-management',
    question: 'Which Azure RBAC role grants full access including the ability to assign access to others?',
    options: ['Owner', 'Contributor', 'Reader', 'Guest'],
    answerIndex: 0,
    explanation:
      'The Owner role has full access to all resources and can also delegate access to other users.',
  },
  {
    id: 'q-mgmt-4',
    topicId: 'azure-management',
    question: 'Which Azure RBAC role can view resources but cannot make changes?',
    options: ['Owner', 'Contributor', 'Reader', 'User Access Administrator'],
    answerIndex: 2,
    explanation:
      'The Reader role can view resources but does not have permission to create or modify them.',
  },
  {
    id: 'q-mgmt-5',
    topicId: 'azure-management',
    question: 'What is the purpose of Azure Policy?',
    options: [
      'To host websites',
      'To enforce organizational rules and compliance on resources',
      'To bill customers',
      'To translate documents',
    ],
    answerIndex: 1,
    explanation:
      'Azure Policy enforces organizational standards by evaluating and controlling resource configurations.',
  },
  {
    id: 'q-mgmt-6',
    topicId: 'azure-management',
    question: 'Which Azure tool estimates the cost of resources before you create them?',
    options: [
      'Azure Cost Management',
      'Azure Pricing Calculator',
      'Azure Monitor',
      'Azure Advisor',
    ],
    answerIndex: 1,
    explanation:
      'The Azure Pricing Calculator lets you estimate the cost of planned Azure resources before you build them.',
  },
  {
    id: 'q-mgmt-7',
    topicId: 'azure-management',
    question: 'What are Azure tags used for?',
    options: [
      'Encrypting data at rest',
      'Organizing resources by metadata like team, project, or environment',
      'Routing network traffic',
      'Hosting web applications',
    ],
    answerIndex: 1,
    explanation:
      'Tags are key-value labels you add to resources to organize them by metadata such as team, project, or environment, which helps with cost tracking and management.',
  },
  {
    id: 'q-mgmt-8',
    topicId: 'azure-management',
    question: 'Which Azure service collects metrics and logs so you can monitor resource performance?',
    options: [
      'Azure Monitor',
      'Azure Policy',
      'Azure RBAC',
      'Azure Files',
    ],
    answerIndex: 0,
    explanation:
      'Azure Monitor collects metrics and logs from Azure resources, giving you visibility into performance and the ability to set alerts.',
  },
];
