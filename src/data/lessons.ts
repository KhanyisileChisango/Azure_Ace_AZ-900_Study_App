import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  // ---------- CLOUD CONCEPTS ----------
  {
    id: 'what-is-cloud',
    topicId: 'cloud-concepts',
    title: 'What is cloud computing?',
    summary:
      'Cloud computing delivers computing services over the internet, on demand and with pay-as-you-go pricing.',
    explanation:
      'Cloud computing means renting computing resources — like servers, storage, databases, and software — from a provider over the internet, instead of buying and maintaining your own physical hardware. You typically pay only for what you use, and you can scale up or down quickly as your needs change. The provider (such as Microsoft, Amazon, or Google) owns and maintains the underlying hardware and infrastructure, so you do not have to.',
    analogy:
      'Think of cloud computing like renting a hotel room instead of building your own house. You get a comfortable place to stay whenever you need it, you pay only for the nights you use, and someone else handles maintenance, repairs, and security. If your needs change — more guests, a longer stay — you simply book a different room.',
    businessExample:
      'A small startup wants to launch a new mobile app. Instead of buying expensive servers and hiring an IT team to run a data center, they rent cloud services from Microsoft Azure. They start small, pay only for the resources their early users consume, and scale up automatically as the app becomes popular — all without buying a single piece of hardware.',
    keyTakeaways: [
      'Cloud computing delivers computing services over the internet on demand.',
      'You pay only for what you use, with no upfront hardware investment.',
      'The provider manages the underlying hardware and infrastructure.',
    ],
    knowledgeCheck: {
      question:
        'Which best describes cloud computing for a beginner?',
      options: [
        'Buying your own servers and placing them in your office',
        'Renting computing services over the internet and paying for what you use',
        'A single, fixed computer in a remote location',
        'Software that only runs without internet',
      ],
      answerIndex: 1,
      explanation:
        'Cloud computing means renting computing services from a provider over the internet and paying for what you use, without owning the hardware.',
    },
  },
  {
    id: 'iaas-paas-saas',
    topicId: 'cloud-concepts',
    title: 'IaaS, PaaS, and SaaS',
    summary:
      'Three main cloud service models that give you different levels of control and responsibility.',
    explanation:
      'Cloud services come in three main models. Infrastructure as a Service (IaaS) gives you the most control — you rent servers, storage, and networking, and you handle the operating system, apps, and data. Platform as a Service (PaaS) provides a ready-made platform where you deploy your own apps while the provider manages the underlying servers and operating system. Software as a Service (SaaS) is fully finished software accessed through a browser or app — the provider manages everything, and you simply use it. As you move from IaaS to SaaS, you give up control in exchange for convenience.',
    analogy:
      'Imagine you want to eat dinner. With IaaS, you rent a kitchen and cook everything yourself. With PaaS, you rent a kitchen that already has the ingredients and basic equipment, and you just follow a recipe. With SaaS, you order a ready-made meal at a restaurant — someone else cooked it, plated it, and serves it to you.',
    businessExample:
      'A company uses Azure Virtual Machines (IaaS) to run a custom database, Azure App Service (PaaS) to host a web application they built, and Microsoft 365 (SaaS) for email and document collaboration. Each model fits a different need: full control, a productive development platform, or ready-to-use productivity tools.',
    keyTakeaways: [
      'IaaS gives you the most control over the infrastructure.',
      'PaaS provides a platform so you can focus on building your app.',
      'SaaS is finished software you use directly.',
    ],
    knowledgeCheck: {
      question:
        'Which cloud service model gives you the most control over the operating system and applications?',
      options: ['SaaS', 'PaaS', 'IaaS', 'DaaS'],
      answerIndex: 2,
      explanation:
        'IaaS (Infrastructure as a Service) gives you the most control because you manage the operating system, apps, and data while the provider handles only the physical hardware.',
    },
  },
  {
    id: 'cloud-models',
    topicId: 'cloud-concepts',
    title: 'Public, private, and hybrid cloud',
    summary:
      'Different deployment models depending on who owns the resources and where they run.',
    explanation:
      'A public cloud is owned by a provider and shared by many customers over the internet — Azure, AWS, and Google Cloud are examples. A private cloud is used by a single organization, often hosted in its own data center or by a third party, giving more control and privacy. A hybrid cloud combines public and private clouds, letting data and apps move between them — useful when some workloads must stay private while others benefit from public cloud scale. The right model depends on cost, security, and flexibility needs.',
    analogy:
      'Public cloud is like using public transport — shared, affordable, and convenient. Private cloud is like owning your own car — exclusive and under your control. Hybrid cloud is like owning a car for daily commutes and taking a train for long trips — you use the best option for each situation.',
    businessExample:
      'A hospital keeps sensitive patient records on a private cloud for security and compliance, but runs its public website and appointment-booking app on the public cloud to handle traffic spikes. A hybrid setup lets both systems work together when needed.',
    keyTakeaways: [
      'Public cloud is shared across many customers over the internet.',
      'Private cloud serves a single organization for more control.',
      'Hybrid cloud combines public and private for flexibility.',
    ],
    knowledgeCheck: {
      question:
        'A company keeps customer data private but uses public cloud for marketing campaigns. Which model is this?',
      options: ['Public cloud', 'Private cloud', 'Hybrid cloud', 'Multi-cloud'],
      answerIndex: 2,
      explanation:
        'Combining private and public cloud resources is the hybrid cloud model, which lets workloads move between them.',
    },
  },
  {
    id: 'opex-vs-capex',
    topicId: 'cloud-concepts',
    title: 'Consumption-based pricing and costs',
    summary:
      'The cloud changes how you pay for IT — from big upfront costs to pay-as-you-go usage.',
    explanation:
      'Traditional IT uses capital expenditure (CapEx): you buy servers and equipment up front, a large one-time cost. Cloud computing uses operational expenditure (OpEx): you pay for resources as you consume them, like a utility bill. This means no large upfront investment, predictable ongoing costs, and the ability to scale spending up or down. The cloud is also often more cost-effective because the provider spreads hardware costs across many customers and handles maintenance.',
    analogy:
      'CapEx is like buying a car outright — you pay a lot up front and own it. OpEx is like taking a taxi — you pay only for the distance you travel, and someone else handles maintenance and fuel.',
    businessExample:
      'A retail business avoids buying $50,000 worth of servers for a seasonal sale. Instead, it rents cloud resources for the two-month busy period, pays only for what it uses, and shuts them down when the sale ends — saving money and avoiding idle equipment for the rest of the year.',
    keyTakeaways: [
      'CapEx is a large upfront purchase; OpEx is pay-as-you-go.',
      'The cloud shifts spending to operational, usage-based costs.',
      'You can scale costs up or down with demand.',
    ],
    knowledgeCheck: {
      question: 'Which best describes operational expenditure (OpEx)?',
      options: [
        'A one-time purchase of physical servers',
        'Paying for computing resources as you use them',
        'Buying a building to house servers',
        'A yearly hardware maintenance contract',
      ],
      answerIndex: 1,
      explanation:
        'OpEx means paying for resources as you consume them, like a utility bill — exactly how cloud services are billed.',
    },
  },

  // ---------- AZURE ARCHITECTURE & SERVICES ----------
  {
    id: 'regions-az',
    topicId: 'azure-architecture',
    title: 'Regions, availability zones, and datacenters',
    summary:
      'Azure is made up of datacenters grouped into regions, with availability zones for resilience.',
    explanation:
      'Azure runs in datacenters around the world. A region is a set of datacenters deployed within a specific geographic area, close enough to have low-latency connections. An availability zone is a physically separate group of datacenters within a region, with independent power, cooling, and networking — so if one zone fails, the others keep running. A region pair is two nearby regions that back each other up for disaster recovery. This structure lets you place apps close to users and keep them running even if something goes wrong.',
    analogy:
      'Think of a region like a city, an availability zone like a separate neighborhood with its own power grid, and a datacenter like a building within that neighborhood. If one neighborhood loses power, the city keeps running because the others are independent.',
    businessExample:
      'A global retailer hosts its European website in the Azure West Europe region. To be safe, it spreads its app across two availability zones there, so a power outage in one datacenter does not take the website offline.',
    keyTakeaways: [
      'A region contains one or more datacenters in a geographic area.',
      'Availability zones are independent datacenters within a region.',
      'Region pairs provide cross-region backup for disaster recovery.',
    ],
    knowledgeCheck: {
      question:
        'What is an availability zone in Azure?',
      options: [
        'A single server in a datacenter',
        'A physically separate datacenter group with independent power and networking',
        'A software feature for scaling apps',
        'A billing boundary for subscriptions',
      ],
      answerIndex: 1,
      explanation:
        'An availability zone is a physically separate group of datacenters within a region, with its own power, cooling, and networking for resilience.',
    },
  },
  {
    id: 'compute-services',
    topicId: 'azure-architecture',
    title: 'Compute: virtual machines and app services',
    summary:
      'Azure offers several ways to run your applications, from full-control VMs to fully managed platforms.',
    explanation:
      'Azure Virtual Machines (VMs) let you run a full operating system in the cloud — you manage the OS, patches, and apps. Azure App Service is a managed platform for hosting web apps without worrying about the underlying servers. Azure Containers and Azure Kubernetes Service (AKS) run containerized apps that are lightweight and portable. Azure Functions is serverless computing — you write small pieces of code that run on demand, and Azure handles everything else. Each option trades control for convenience.',
    analogy:
      'VMs are like renting an empty apartment and furnishing it yourself. App Service is like renting a furnished apartment — ready to move in. Serverless is like calling a taxi — you do not own or maintain anything, you just use it when needed.',
    businessExample:
      'A company runs a legacy accounting application on Azure Virtual Machines because it needs full OS control. Its marketing website runs on Azure App Service so developers can focus on the website code, not server management.',
    keyTakeaways: [
      'VMs give you full control over the operating system.',
      'App Service is a managed platform for web applications.',
      'Azure Functions is serverless — code runs on demand.',
    ],
    knowledgeCheck: {
      question:
        'Which Azure service is best described as serverless computing that runs code on demand?',
      options: [
        'Azure Virtual Machines',
        'Azure App Service',
        'Azure Functions',
        'Azure Storage',
      ],
      answerIndex: 2,
      explanation:
        'Azure Functions is a serverless compute service that runs your code on demand without managing servers.',
    },
  },
  {
    id: 'storage-services',
    topicId: 'azure-architecture',
    title: 'Storage: blobs, files, disks, and tables',
    summary:
      'Azure Storage offers different types of storage for different kinds of data.',
    explanation:
      'Azure Blob Storage stores unstructured data like images, videos, and documents — great for backups and media. Azure Files provides shared file storage accessible via standard protocols, useful for lift-and-shift scenarios. Azure Disk Storage provides persistent disks attached to VMs. Azure Table Storage stores structured NoSQL data, cost-effective for large datasets. All Azure Storage is encrypted, durable, and accessible from anywhere via HTTP/HTTPS.',
    analogy:
      'Blob storage is like a big filing cabinet for any documents. Azure Files is like a shared network drive everyone in the office can access. Disk storage is like the hard drive inside a computer. Table storage is like a spreadsheet that can hold millions of simple rows.',
    businessExample:
      'An e-commerce site stores product images and videos in Blob Storage, shares configuration files across servers using Azure Files, and keeps its product catalog metadata in Table Storage for quick, low-cost lookups.',
    keyTakeaways: [
      'Blob Storage is for unstructured data like images and documents.',
      'Azure Files provides shared file storage.',
      'Table Storage is cost-effective NoSQL storage for structured data.',
    ],
    knowledgeCheck: {
      question:
        'Which Azure storage service is best for storing unstructured images and videos?',
      options: [
        'Azure Table Storage',
        'Azure Blob Storage',
        'Azure Disk Storage',
        'Azure SQL Database',
      ],
      answerIndex: 1,
      explanation:
        'Azure Blob Storage is designed for unstructured data such as images, videos, and documents.',
    },
  },
  {
    id: 'networking-services',
    topicId: 'azure-architecture',
    title: 'Networking: VNets and load balancing',
    summary:
      'Azure networking lets you connect resources securely and distribute traffic efficiently.',
    explanation:
      'An Azure Virtual Network (VNet) is a private network in the cloud that lets your resources communicate securely. A load balancer distributes incoming traffic across multiple servers to keep apps responsive and available. Azure Application Gateway is a smart load balancer for web apps that can route by URL. Azure VPN Gateway and ExpressRoute connect your on-premises network to Azure securely. Azure DNS hosts your domain names. Together, these services form the backbone of any Azure deployment.',
    analogy:
      'A VNet is like the internal wiring of your office building — private and secure. A load balancer is like a receptionist directing visitors to the least busy desk. ExpressRoute is like a dedicated private road straight to your building, instead of using public streets.',
    businessExample:
      'A company creates a VNet for its Azure VMs to communicate privately, places a load balancer in front of its web servers to spread traffic evenly, and uses ExpressRoute for a fast, private connection between its headquarters and Azure.',
    keyTakeaways: [
      'VNets provide private, secure communication between Azure resources.',
      'Load balancers distribute traffic to keep apps available.',
      'ExpressRoute gives a private, dedicated connection to Azure.',
    ],
    knowledgeCheck: {
      question:
        'What does an Azure load balancer do?',
      options: [
        'Stores large amounts of data',
        'Distributes incoming traffic across multiple servers',
        'Encrypts data at rest',
        'Manages user passwords',
      ],
      answerIndex: 1,
      explanation:
        'A load balancer distributes incoming network traffic across multiple servers to improve availability and responsiveness.',
    },
  },

  // ---------- AZURE MANAGEMENT & GOVERNANCE ----------
  {
    id: 'subscriptions-rbac',
    topicId: 'azure-management',
    title: 'Subscriptions and resource groups',
    summary:
      'Azure organizes your resources into a clear hierarchy for billing and management.',
    explanation:
      'An Azure subscription is the billing and access boundary — every Azure resource belongs to a subscription. A resource group is a container that holds related resources for a solution, like a virtual machine, its disk, and its network interface. Management groups sit above subscriptions and let you apply policies across many subscriptions at once. This hierarchy helps you organize, bill, and govern resources cleanly as your use of Azure grows.',
    analogy:
      'A subscription is like your bank account — it is where costs are billed. A resource group is like a labeled folder in your filing cabinet that keeps related project documents together. Management groups are like departments that oversee many folders at once.',
    businessExample:
      'A company has separate subscriptions for development and production so teams have isolated environments and costs are billed separately. Within each subscription, resources are grouped — one resource group for the web app, another for the database.',
    keyTakeaways: [
      'Every Azure resource belongs to a subscription.',
      'Resource groups organize related resources for a solution.',
      'Management groups apply policies across multiple subscriptions.',
    ],
    knowledgeCheck: {
      question:
        'In Azure, what is a resource group?',
      options: [
        'A billing plan for customers',
        'A container that holds related resources for a solution',
        'A type of virtual machine',
        'A security policy document',
      ],
      answerIndex: 1,
      explanation:
        'A resource group is a container that holds related Azure resources used together in a solution, making management easier.',
    },
  },
  {
    id: 'rbac-iam',
    topicId: 'azure-management',
    title: 'Azure role-based access control (RBAC)',
    summary:
      'RBAC lets you control who can do what with your Azure resources.',
    explanation:
      'Azure Role-Based Access Control (RBAC) manages access to Azure resources. You assign roles to users, groups, or applications at a specific scope — subscription, resource group, or a single resource. Common roles include Owner (full access, can delegate), Contributor (can manage everything but cannot assign access), and Reader (can view but not change). RBAC follows the principle of least privilege — giving people only the access they need.',
    analogy:
      'RBAC is like assigning jobs at a restaurant. The owner can do anything and hire staff. The chef (Contributor) can cook and manage the kitchen but cannot hire staff. A customer (Reader) can look at the menu but cannot enter the kitchen.',
    businessExample:
      'A company gives developers Contributor access to a dev resource group so they can deploy and test apps, but only grants Reader access to the production subscription so they cannot accidentally change live systems. An IT manager has Owner access to delegate permissions as needed.',
    keyTakeaways: [
      'RBAC controls who can access and manage Azure resources.',
      'Owner, Contributor, and Reader are common built-in roles.',
      'Apply least privilege — grant only the access people need.',
    ],
    knowledgeCheck: {
      question:
        'Which Azure RBAC role can manage resources but cannot assign access to others?',
      options: ['Owner', 'Contributor', 'Reader', 'User Access Administrator'],
      answerIndex: 1,
      explanation:
        'The Contributor role can create and manage resources but cannot grant access to other users — only Owner and User Access Administrator can.',
    },
  },
  {
    id: 'azure-policy',
    topicId: 'azure-management',
    title: 'Azure Policy and governance',
    summary:
      'Azure Policy enforces rules so your resources stay compliant and consistent.',
    explanation:
      'Azure Policy is a service that enforces organizational standards and compliance across your resources. A policy definition is a rule — for example, "only allow resources in certain regions" or "all storage accounts must be encrypted." You assign policies to a scope like a subscription or resource group. Non-compliant resources are flagged or blocked. Azure Blueprints bundles policies, roles, and templates into a repeatable package for consistent environments.',
    analogy:
      'Azure Policy is like the rules of a housing community — every house must follow certain standards, like fence height or paint colors. If someone breaks a rule, the community manager steps in. This keeps the neighborhood consistent and pleasant.',
    businessExample:
      'A company uses Azure Policy to ensure no one can create resources outside approved regions, and that all storage accounts have encryption enabled. This keeps data in compliant regions and protected, without relying on every team to remember the rules.',
    keyTakeaways: [
      'Azure Policy enforces rules and standards on resources.',
      'Policies are assigned at a scope like subscription or resource group.',
      'Non-compliant resources can be blocked or flagged.',
    ],
    knowledgeCheck: {
      question:
        'What is the main purpose of Azure Policy?',
      options: [
        'To bill customers for resource usage',
        'To enforce organizational rules and compliance on resources',
        'To host websites',
        'To translate documents between languages',
      ],
      answerIndex: 1,
      explanation:
        'Azure Policy enforces organizational standards and compliance by evaluating and controlling resource configurations.',
    },
  },
  {
    id: 'cost-tools',
    topicId: 'azure-management',
    title: 'Cost management and monitoring',
    summary:
      'Azure provides tools to estimate, track, and control your cloud spending.',
    explanation:
      'The Azure Pricing Calculator estimates the cost of planned resources before you build. Azure Cost Management shows where your money goes, sets budgets, and alerts you when spending approaches a limit. Tags are labels you add to resources to organize costs by team, project, or environment. Azure Monitor collects metrics and logs from your resources so you can see performance and set alerts. Together, these tools keep you in control of cost and operations.',
    analogy:
      'The Pricing Calculator is like browsing a menu with prices before ordering. Cost Management is like your monthly bank statement that shows where you spent and warns you when you near your budget. Tags are like labels on your receipts that sort spending into "groceries" or "transport".',
    businessExample:
      'A company uses the Pricing Calculator before launching a new service to compare VM sizes and costs. Once running, it tags resources by department, sets a monthly budget in Cost Management, and receives alerts if any team is about to overspend.',
    keyTakeaways: [
      'The Pricing Calculator estimates costs before you build.',
      'Cost Management tracks spending, budgets, and alerts.',
      'Tags help organize costs by team, project, or environment.',
    ],
    knowledgeCheck: {
      question:
        'Which Azure tool helps you estimate the cost of resources before you create them?',
      options: [
        'Azure Cost Management',
        'Azure Pricing Calculator',
        'Azure Monitor',
        'Azure Policy',
      ],
      answerIndex: 1,
      explanation:
        'The Azure Pricing Calculator lets you estimate the cost of planned resources before you build them.',
    },
  },
];
