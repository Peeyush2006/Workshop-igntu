import { EventConfig, Speaker, ScheduleItem, OrganizingMember } from './types';

export const initialEventConfig: EventConfig = {
  id: 'viksit-bharat-ai-2047',
  title: 'AI for Viksit Bharat @ 2047: Relevance, Significance, and a Future-Ready Nation-Centric Direction',
  themeSubtitle: 'Relevance, Significance, and a Future-Ready Nation-Centric Direction',
  institution: 'Indira Gandhi National Tribal University, Amarkantak',
  department: 'Department of Computer Science',
  eventDate: '2026-10-14',
  eventDateFormatted: '14 October 2026',
  eventFormat: 'One-day academic workshop-cum-seminar',
  startTime: '09:30 AM',
  endTime: '05:30 PM',
  registrationDeadline: '2026-10-13T23:59:59',
  venue: 'Prof. Laxman Havnoor Auditorium',
  venueAddress: 'Indira Gandhi National Tribal University, Lalpur, Amarkantak, Anuppur District, Madhya Pradesh - 484887',
  registrationFee: 'Free',
  maxCapacity: 250,
  contactEmail: 'peeyushkumartiwari18@gmail.com',
  contactPhone: '+91 9202261369',
  emergencyNotice: '',
  allowNewRegistrations: true,
};

export const speakersData: Speaker[] = [
  {
    id: 'aditi-saraf',
    name: 'Aditi Saraf',
    designation: 'DevOps Engineer, C.S.G.',
    organization: 'C.S.G.',
    coreAreas: 'DevOps, Cloud Engineering & Software Development',
    biography:
      'Aditi Saraf is a technology enthusiast with a strong foundation in cloud computing, DevOps, and software development. She works across AWS and Azure, with hands-on expertise in Docker, Kubernetes, Terraform, Jenkins, Ansible, Git, and cloud infrastructure.\n\nWith experience in Python, Java, Groovy, SQL, JavaScript, and HTML, Aditi is adaptable to new technologies and focused on building scalable, reliable, and efficient solutions. She brings a problem-solving mindset and a strong willingness to take on new challenges and opportunities.',
    photoUrl: '/images/speakers/aditi-saraf.jpg',
    sessionTitle: 'Scalable Cloud Platforms & Continuous DevOps for Resilient AI Architectures',
    sessionTime: '1:15 PM – 2:00 PM',
    sessionType: 'Industry Expert',
    technicalExpertise: [
      {
        category: 'Cloud',
        skills: ['AWS', 'Microsoft Azure', 'Cloud Architecture', 'Infrastructure Optimization'],
      },
      {
        category: 'DevOps',
        skills: ['Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Ansible'],
      },
      {
        category: 'Programming',
        skills: ['Python', 'Java', 'Groovy', 'JavaScript'],
      },
      {
        category: 'Other',
        skills: ['SQL', 'HTML', 'Git / GitHub', 'CI/CD Pipelines'],
      },
    ],
  },
  {
    id: 'shivansh-gupta',
    name: 'Shivansh Gupta',
    designation: 'DevOps and Cloud Infra Lead, Baseel Ltd.',
    organization: 'Baseel Ltd.',
    coreAreas: 'Cloud Infrastructure, Automation & Backend Engineering',
    biography:
      'Shivansh Gupta is a technology enthusiast with over two years of professional experience building, deploying, and optimizing real-world software systems. His expertise spans cloud-native infrastructure, DevOps automation, backend development, and production deployments.\n\nHe works with Docker, Kubernetes, GitLab, Jenkins, Terraform, AWS, Azure, and VPS infrastructure, with hands-on experience deploying production applications using Nginx, Apache, SSL/TLS, and DNS. He also specializes in backend development with Spring Boot and databases including PostgreSQL, MySQL, and MongoDB.\n\nDriven by curiosity and a problem-solving mindset, Shivansh focuses on automation, performance, scalability, and security, leveraging tools such as Vault, MinIO, Prometheus, Grafana, and Bash to build reliable systems.',
    photoUrl: '/images/speakers/shivansh-gupta.jpg',
    sessionTitle: 'Mission-Critical Backend Engineering, Automation & Observability for Nation-Scale Platforms',
    sessionTime: '2:00 PM – 2:45 PM',
    sessionType: 'Industry Expert',
    technicalExpertise: [
      {
        category: 'Cloud',
        skills: ['AWS', 'Azure', 'VPS infrastructure'],
      },
      {
        category: 'DevOps',
        skills: ['Docker', 'Kubernetes', 'GitLab', 'Jenkins', 'Terraform'],
      },
      {
        category: 'Deployment',
        skills: ['Nginx', 'Apache', 'SSL/TLS', 'DNS'],
      },
      {
        category: 'Backend',
        skills: ['Spring Boot', 'REST APIs', 'Microservices'],
      },
      {
        category: 'Databases',
        skills: ['PostgreSQL', 'MySQL', 'MongoDB'],
      },
      {
        category: 'Monitoring & Security',
        skills: ['Prometheus', 'Grafana', 'Vault'],
      },
      {
        category: 'Automation',
        skills: ['Bash', 'MinIO', 'Scripting'],
      },
    ],
  },
  {
    id: 'shivam-patel',
    name: 'Shivam Patel',
    designation: 'Application Development, Tata Consultancy Services Limited',
    organization: 'Tata Consultancy Services (TCS)',
    coreAreas: 'Application Development, Microservices & Enterprise Software',
    biography:
      'Shivam Patel is a System Engineer at Tata Consultancy Services (TCS) with a Master’s in Computer Applications and hands-on experience in application development and enterprise software engineering. He currently works on microservices-based application development as part of the Accounting Modernization program.\n\nHis technical interests span web and application development, database management, network security, and DevOps practices, with experience working with tools such as Git and Jenkins. He also gained early exposure to Machine Learning Operations (MLOps) through his internship at LinuxWorld Informatics.\n\nWith a strong interest in building reliable applications and continuously expanding his technical expertise, Shivam brings an adaptable and development-focused approach to solving real-world technology problems.',
    photoUrl: '/images/speakers/shivam-patel.jpg',
    sessionTitle: 'Enterprise Microservices Modernization & MLOps for Future-Ready Digital Public Infrastructure',
    sessionTime: '2:45 PM – 3:30 PM',
    sessionType: 'Industry Expert',
    technicalExpertise: [
      {
        category: 'Enterprise Development',
        skills: ['Application development', 'Enterprise software engineering', 'Accounting Modernization'],
      },
      {
        category: 'Architecture',
        skills: ['Microservices-based development', 'Distributed Services'],
      },
      {
        category: 'Core Engineering',
        skills: ['Web development', 'Database management', 'Network security'],
      },
      {
        category: 'DevOps & MLOps',
        skills: ['Git', 'Jenkins', 'Machine Learning Operations (MLOps)'],
      },
    ],
  },
];

export const aiPillars = [
  {
    id: 'education',
    title: 'Education & Personalized Learning',
    description: 'Empowering students across diverse linguistic and regional backgrounds with adaptive AI tutoring, automated evaluation, and equitable knowledge dissemination.',
    icon: 'GraduationCap',
  },
  {
    id: 'healthcare',
    title: 'Healthcare & Medical Research',
    description: 'Transforming rural healthcare delivery with AI-assisted diagnostics, telemedicine triaging, genomic computing, and predictive public health management.',
    icon: 'HeartPulse',
  },
  {
    id: 'agriculture',
    title: 'Agriculture & Rural Development',
    description: 'Harnessing precision agriculture, satellite imagery, crop pest detection models, and climate-resilient farming advisories for smallholder farmers.',
    icon: 'Wheat',
  },
  {
    id: 'governance',
    title: 'Governance & Public Services',
    description: 'Enhancing civic transparency, citizen grievance redressal, smart welfare delivery, and evidence-driven policy making through open AI architectures.',
    icon: 'Landmark',
  },
  {
    id: 'languages',
    title: 'Indian-Language Technologies',
    description: 'Advancing Indic NLP, voice interfaces, and translation models (Bhashini) to bring cutting-edge computing to tribal dialects and scheduled Indian languages.',
    icon: 'Languages',
  },
  {
    id: 'environment',
    title: 'Environmental Sustainability',
    description: 'Monitoring forest ecosystems, water reservoirs, biodiversity conservation in the Maikal ranges, and renewable energy optimization using AI.',
    icon: 'Trees',
  },
  {
    id: 'research',
    title: 'Scientific Research & Innovation',
    description: 'Accelerating breakthroughs in materials science, mathematical modeling, high-performance computing, and automated hypothesis generation.',
    icon: 'Atom',
  },
  {
    id: 'entrepreneurship',
    title: 'Entrepreneurship & Employment',
    description: 'Catalyzing grassroots tech startups, upskilling rural youth for high-value digital careers, and building self-sustaining regional innovation hubs.',
    icon: 'Briefcase',
  },
  {
    id: 'cybersecurity',
    title: 'Cybersecurity, Privacy & Responsible AI',
    description: 'Safeguarding digital sovereign infrastructure, defending against algorithmic bias, preserving citizen privacy, and establishing ethical AI guardrails.',
    icon: 'ShieldCheck',
  },
];

export const eventObjectives = [
  {
    number: '01',
    title: 'Scientific Research & Data Analytics',
    description: 'Explore the role of Artificial Intelligence in scientific research, technological innovation, mathematical modelling, and high-dimensional data analytics.',
  },
  {
    number: '02',
    title: 'Indic Languages & Cultural Heritage',
    description: 'Examine AI applications in Indian languages, literature, tribal culture preservation, history, cultural heritage, and digital humanities.',
  },
  {
    number: '03',
    title: 'Social Inclusion & Public Service Delivery',
    description: 'Investigate AI for social inclusion, rural and tribal empowerment, agricultural advancement, and equitable public service delivery.',
  },
  {
    number: '04',
    title: 'Economic Growth & Responsible Governance',
    description: 'Analyze AI’s transformative impact on economic productivity, youth entrepreneurship, employment generation, cybersecurity, and ethical governance.',
  },
];

export const scheduleData: ScheduleItem[] = [
  {
    id: 'session-1',
    time: '09:00 AM to 09:45 AM',
    title: 'Participant Registration & Digital Pass Verification',
    category: 'Inaugural',
    description: 'Registration verification at Prof. Lakshman Honour Auditorium desk, QR badge issuance, and welcome kit collection.',
    venue: 'Auditorium Foyer',
  },
  {
    id: 'session-2',
    time: '09:45 AM to 10:30 AM',
    title: 'Inaugural Ceremony & Saraswati Vandana',
    category: 'Inaugural',
    description: 'Lighting of the Ceremonial Lamp, Welcome Address by Head of Department, Inaugural Address by Vice Chancellor, and Unveiling of the Workshop Theme.',
    venue: 'Main Auditorium Hall',
  },
  {
    id: 'session-3',
    time: '10:30 AM to 11:45 AM',
    title: 'Keynote Address: Scalable Cloud Platforms & Continuous DevOps for Resilient AI Architectures',
    category: 'Keynote',
    speakerId: 'aditi-saraf',
    speakerName: 'Aditi Saraf',
    description: 'Architecting high-availability cloud platforms across AWS and Azure, containerized workflows with Kubernetes & Terraform, and building scalable CI/CD pipelines for national-scale AI workloads.',
    venue: 'Main Auditorium Hall',
  },
  {
    id: 'session-4',
    time: '11:45 AM to 12:00 PM',
    title: 'High Tea & Academic Networking',
    category: 'Networking',
    description: 'Networking break with dignitaries, speakers, faculty members, and research scholars.',
    venue: 'Auditorium Lawns',
  },
  {
    id: 'session-5',
    time: '12:00 PM to 01:15 PM',
    title: 'Technical Session 1: Enterprise Microservices Modernization & MLOps for Future-Ready Digital Public Infrastructure',
    category: 'Technical',
    speakerId: 'shivam-patel',
    speakerName: 'Shivam Patel',
    description: 'Deep dive into microservices patterns, enterprise modernizations, database reliability, and integrating Machine Learning Operations (MLOps) into mission-critical systems.',
    venue: 'Main Auditorium Hall',
  },
  {
    id: 'session-6',
    time: '01:15 PM to 02:15 PM',
    title: 'Lunch Break & Poster Displays',
    category: 'Networking',
    description: 'Delegates networking lunch and demonstration of student research posters on Viksit Bharat AI initiatives.',
    venue: 'University Guest House Dining Hall',
  },
  {
    id: 'session-7',
    time: '02:15 PM to 03:30 PM',
    title: 'Technical Session 2: Mission-Critical Backend Engineering, Automation & Observability for Nation-Scale Platforms',
    category: 'Technical',
    speakerId: 'shivansh-gupta',
    speakerName: 'Shivansh Gupta',
    description: 'Production deployment strategies with Nginx, Spring Boot backend optimizations, secret management with Vault, and full-stack observability with Prometheus and Grafana.',
    venue: 'Main Auditorium Hall',
  },
  {
    id: 'session-8',
    time: '03:30 PM to 04:30 PM',
    title: 'Panel Discussion: "AI for Viksit Bharat @ 2047: Empowering Tribal Regions, Bridging the Digital Divide & Ethical Guardrails"',
    category: 'Panel',
    description: 'Interactive panel featuring faculty experts, industry practitioners, and research scholars addressing regional technology challenges, ethical AI guidelines, and career opportunities for students.',
    venue: 'Main Auditorium Hall',
  },
  {
    id: 'session-9',
    time: '04:30 PM to 05:30 PM',
    title: 'Valedictory Session, Certificate Presentation & National Anthem',
    category: 'Valedictory',
    description: 'Summary of workshop proceedings, distribution of Certificates of Participation, vote of thanks by Organizing Secretary, and concluding National Anthem.',
    venue: 'Main Auditorium Hall',
  },
];

export const organizingTeam: OrganizingMember[] = [
  {
    id: 'org-1',
    name: 'Prof. Sri Krishna Singh',
    role: 'Chief Patron',
    designation: 'Hon’ble Vice Chancellor',
    departmentOrOrg: 'Indira Gandhi National Tribal University, Amarkantak',
    isChiefPatron: true,
    category: 'Patrons',
  },
  {
    id: 'org-2',
    name: 'Prof. N. K. Sharma',
    role: 'Patron',
    designation: 'Registrar',
    departmentOrOrg: 'Indira Gandhi National Tribal University, Amarkantak',
    category: 'Patrons',
  },
  {
    id: 'org-3',
    name: 'Prof. Ram Shringar Rao',
    role: 'Convener & Chairman',
    designation: 'Professor & Head',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Convener & Secretaries',
  },
  {
    id: 'org-4',
    name: 'Dr. Abhishek Bansal',
    role: 'Organizing Secretary',
    designation: 'Associate Professor',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Convener & Secretaries',
  },
  {
    id: 'org-5',
    name: 'Dr. Sudesh Kumar',
    role: 'Joint Organizing Secretary',
    designation: 'Assistant Professor',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Convener & Secretaries',
  },
  {
    id: 'org-6',
    name: 'Dr. Vikash Kumar',
    role: 'Faculty Coordinator',
    designation: 'Assistant Professor',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Faculty Coordinators',
  },
  {
    id: 'org-7',
    name: 'Er. Arvind Patel',
    role: 'Technical Coordinator',
    designation: 'System Analyst & Lab In-Charge',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Faculty Coordinators',
  },
  {
    id: 'org-8',
    name: 'Research Scholars & PG Tech Council',
    role: 'Student Logistics & Web Team',
    designation: 'Student Organizing Committee',
    departmentOrOrg: 'Department of Computer Science, IGNTU',
    category: 'Student Committee',
  },
];

export const faqData = [
  {
    question: 'Who can register for this workshop-cum-seminar?',
    answer: 'The event is open to Undergraduate (UG) students, Postgraduate (PG) students, PhD research scholars, faculty members, and technology professionals interested in Artificial Intelligence, Cloud Computing, and Viksit Bharat 2047 digital initiatives.',
  },
  {
    question: 'Is there any registration fee?',
    answer: 'No. Registration for the workshop is completely free of cost. However, seats are limited to 250 participants to ensure high-quality interactions and hands-on discussions.',
  },
  {
    question: 'Will participants receive a certificate of participation?',
    answer: 'Yes! All registered participants who attend the sessions on 14 October 2026 and complete their QR code attendance verification at the venue desk will receive an official Certificate of Participation from the Department of Computer Science, IGNTU.',
  },
  {
    question: 'How does the Digital Pass and QR Attendance work?',
    answer: 'Upon completing your free registration, a unique Digital E-Pass containing an encrypted QR code is instantly generated. You can download or print this pass. On 14 October 2026, present the QR code on your phone or on paper at the registration counter for instant scanning and badge verification.',
  },
  {
    question: 'What is the date and duration of the event?',
    answer: 'The event is strictly a one-day academic workshop held on Wednesday, 14 October 2026, from 09:30 AM to 05:30 PM at Prof. Lakshman Honour Auditorium, IGNTU Amarkantak.',
  },
  {
    question: 'Where is the auditorium located?',
    answer: 'The event takes place at Prof. Lakshman Honour Auditorium, located inside the central campus of Indira Gandhi National Tribal University (IGNTU), Village Lalpur, Amarkantak, Madhya Pradesh.',
  },
  {
    question: 'Can I re-download my pass if I lose it?',
    answer: 'Yes. Use the "Find My Pass" link in the navigation menu, enter the email address or Registration ID you used during sign-up, and you can instantly view and download your pass again.',
  },
];
