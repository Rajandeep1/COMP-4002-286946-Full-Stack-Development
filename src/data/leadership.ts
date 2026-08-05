// Leadership and Management data
// Source: Pixell River Financial Case Study Document, pg. 15
// Each entry now has a numeric id to support CRUD operations in leadershipRepo.

import { Role } from '../types';

const leadership: Role[] = [
  { id: 1,  name: 'Jo-Anne Sinclair',    role: 'CEO / Chair of Board' },
  { id: 2,  name: 'Jackson Smith',       role: 'COO / VP Operations' },
  { id: 3,  name: 'Susan Thomas',        role: 'CFO / VP Administration' },
  { id: 4,  name: 'Richa Kaur',          role: 'VP Client Services' },
  { id: 5,  name: 'Josee Benjamin',      role: 'CIO' },
  { id: 6,  name: 'Vincent Grey',        role: 'VP Sales & Marketing' },
  { id: 7,  name: 'Rupa Kharki',         role: 'Director, Financial and Audit Services' },
  { id: 8,  name: 'Xun Kuang',           role: 'Director, Human Resources' },
  { id: 9,  name: 'Stien Pedersen',      role: 'Director, Legal Services / General Counsel' },
  { id: 10, name: 'Sandra Bear',         role: 'Director, Information Technology' },
  { id: 11, name: 'Gus Blue',            role: 'Director, Information Security and CISSO' },
  { id: 12, name: 'Sam Kong',            role: 'Director, Accounting' },
  { id: 13, name: 'Valentine Smith',     role: 'Director, Physical Security' },
  { id: 14, name: 'Mariya Kaperski',     role: 'Director, Facilities' },
  { id: 15, name: 'Abd al-Hamid Alami',  role: 'Manager, Business Continuity and Disaster Recovery' },
  { id: 16, name: 'Victoria Gray',       role: 'Manager, Internal Audit' },
  { id: 17, name: 'Cheryl Guru',         role: 'Chief Architect' },
  { id: 18, name: 'Jean Ngoy',           role: 'Manager, Security Architecture' },
  { id: 19, name: 'Kris Gold',           role: 'Solution Architect, Online Banking' },
  { id: 20, name: 'Isaac Smith',         role: 'Manager, Application Solutions' },
  { id: 21, name: 'Payton Frost',        role: 'Lead Developer, Online Banking' },
  { id: 22, name: 'Samantha Nettle',     role: 'Manager, Operational Risk' },
  { id: 23, name: 'Yolanda Ferreira',    role: 'Manager, Vendor Relations' },
  { id: 24, name: 'Samir Hassan',        role: 'Manager, Purchasing' },
  { id: 25, name: 'Yuna Aikawa',         role: 'Manager, Communications' },
  { id: 26, name: 'Jonathan Carberry',   role: 'Manager, Customer Experience and Community Engagement' },
  { id: 27, name: 'Roland Wei',          role: 'Manager of Sales' },
  { id: 28, name: 'Pran Singh',          role: 'Manager, Marketing' },
  { id: 29, name: 'Linda Analyst',       role: 'Business Analyst, Online Banking' },
  { id: 30, name: 'Esra Sedge',          role: 'Manager, Contract Management' },
  { id: 31, name: 'Pranee Tan',          role: 'Manager, Compliance Management' },
  { id: 32, name: 'Karmen Spruce',       role: 'Manager, IT End User Service Desk' },
  { id: 33, name: 'Haydar Katirci',      role: 'Manager, IT End User Computing' },
  { id: 34, name: 'Jill Harkness',       role: 'Manager, IT Telecom and Infrastructure' },
  { id: 35, name: 'Tim Morrison',        role: 'Manager, Data Center and Hosting Services' },
  { id: 36, name: 'Aleksandr Milosevic', role: 'Manager, IT Risk Management' },
  { id: 37, name: 'Jim Wingnut',         role: 'Manager, IT Project Management Office' },
];

export default leadership;
