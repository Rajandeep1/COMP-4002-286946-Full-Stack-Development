// prisma/seed.ts
// Seeds the database with the full Employee/Department and Leadership data
// from the Pixell River Financial Case Study (pgs. 15, 17-18).
// Run via: npx prisma db seed
// (Runs automatically after: npx prisma migrate dev)

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// ── Department + Employee data (Case Study pgs. 17-18) ──────────────────────
// Structured as { departmentName, employees[] } to simplify seeding.
// The seed creates Department rows first, then Employee rows that reference
// the department's id — maintaining the FK relationship.

const departmentData: {
  name: string;
  employees: { firstName: string; lastName?: string }[];
}[] = [
  {
    name: 'Administration',
    employees: [
      { firstName: 'Zoë',       lastName: 'Robins'  },
      { firstName: 'Madeleine', lastName: 'Madden'  },
    ],
  },
  {
    name: 'Audit',
    employees: [
      { firstName: 'Josha', lastName: 'Sadowski'  },
      { firstName: 'Kate',  lastName: 'Fleetwood' },
    ],
  },
  {
    name: 'Banking Operations',
    employees: [
      { firstName: 'Priyanka',  lastName: 'Bose'        },
      { firstName: 'Hammed',    lastName: 'Animashaun'  },
      { firstName: 'Álvaro',    lastName: 'Morte'       },
      { firstName: 'Taylor',    lastName: 'Napier'      },
      { firstName: 'Alan',      lastName: 'Simmonds'    },
    ],
  },
  {
    name: 'Communications',
    employees: [
      { firstName: 'Gil',        lastName: 'Cardinal' },
      { firstName: 'Richard J.', lastName: 'Lewis'    },
    ],
  },
  {
    name: 'Corporate Services',
    employees: [
      { firstName: 'Randy',    lastName: 'Bradshaw' },
      { firstName: 'Tracey',   lastName: 'Cook'     },
      { firstName: 'Lubomir',  lastName: 'Mykytiuk' },
    ],
  },
  {
    name: 'Facilities',
    employees: [
      { firstName: 'Dakota',   lastName: 'House'      },
      { firstName: 'Lori Lea', lastName: 'Okemah'     },
      { firstName: 'Renae',    lastName: 'Morrisseau' },
      { firstName: 'Rick',     lastName: 'Belcourt'   },
    ],
  },
  {
    name: 'Financial Services',
    employees: [
      { firstName: 'Selina',      lastName: 'Hanusa' },
      { firstName: 'Buffy',       lastName: 'Gaudry' },
      { firstName: 'Shaneen Ann', lastName: 'Fox'    },
      { firstName: 'Allan',       lastName: 'Little' },
      { firstName: 'Danny',       lastName: 'Rabbit' },
    ],
  },
  {
    name: 'Human Resources',
    employees: [
      { firstName: 'Jesse Ed', lastName: 'Azure'           },
      { firstName: 'Stacy',    lastName: 'Da Silva'        },
      { firstName: 'Vladimír', lastName: 'Valenta'         },
      { firstName: 'Samone',   lastName: 'Sayeses-Whitney' },
      { firstName: 'Paul',     lastName: 'Coeur'           },
    ],
  },
  {
    name: 'Information Technology',
    employees: [
      { firstName: 'Graham',   lastName: 'Greene'    },
      { firstName: 'Sandika',  lastName: 'Evergreen' },
      { firstName: 'Jennifer', lastName: 'Rodriguez' },
    ],
  },
  {
    name: 'IT Technician',
    employees: [
      { firstName: 'Aiyana',   lastName: 'Littlebear'  },
      { firstName: 'Inara',    lastName: 'Thunderbird' },
      { firstName: 'Kaya',     lastName: 'Runningbrook'},
      { firstName: 'Elara',    lastName: 'Firehawk'    },
      { firstName: 'Siona',    lastName: 'Moonflower'  },
      { firstName: 'Kaiyu',    lastName: 'Greywolf'    },
      { firstName: 'Ayawamat', lastName: 'Nightwind'   },
      { firstName: 'Tala',     lastName: 'Braveheart'  },
      { firstName: 'Iniko',    lastName: 'Stonebear'   },
      { firstName: 'Onatah',   lastName: 'Redhawk'     },
    ],
  },
];

// ── Leadership data (Case Study pg. 15) ──────────────────────────────────────
// firstName and lastName are now separate columns (satisfying 1NF atomicity).
// roleTitle is the unique role each person holds.

const leadershipData: {
  firstName: string;
  lastName?: string;
  roleTitle: string;
}[] = [
  { firstName: 'Jo-Anne',      lastName: 'Sinclair',   roleTitle: 'CEO / Chair of Board' },
  { firstName: 'Jackson',      lastName: 'Smith',      roleTitle: 'COO / VP Operations' },
  { firstName: 'Susan',        lastName: 'Thomas',     roleTitle: 'CFO / VP Administration' },
  { firstName: 'Richa',        lastName: 'Kaur',       roleTitle: 'VP Client Services' },
  { firstName: 'Josee',        lastName: 'Benjamin',   roleTitle: 'CIO' },
  { firstName: 'Vincent',      lastName: 'Grey',       roleTitle: 'VP Sales & Marketing' },
  { firstName: 'Rupa',         lastName: 'Kharki',     roleTitle: 'Director, Financial and Audit Services' },
  { firstName: 'Xun',          lastName: 'Kuang',      roleTitle: 'Director, Human Resources' },
  { firstName: 'Stien',        lastName: 'Pedersen',   roleTitle: 'Director, Legal Services / General Counsel' },
  { firstName: 'Sandra',       lastName: 'Bear',       roleTitle: 'Director, Information Technology' },
  { firstName: 'Gus',          lastName: 'Blue',       roleTitle: 'Director, Information Security and CISSO' },
  { firstName: 'Sam',          lastName: 'Kong',       roleTitle: 'Director, Accounting' },
  { firstName: 'Valentine',    lastName: 'Smith',      roleTitle: 'Director, Physical Security' },
  { firstName: 'Mariya',       lastName: 'Kaperski',   roleTitle: 'Director, Facilities' },
  { firstName: 'Abd al-Hamid', lastName: 'Alami',      roleTitle: 'Manager, Business Continuity and Disaster Recovery' },
  { firstName: 'Victoria',     lastName: 'Gray',       roleTitle: 'Manager, Internal Audit' },
  { firstName: 'Cheryl',       lastName: 'Guru',       roleTitle: 'Chief Architect' },
  { firstName: 'Jean',         lastName: 'Ngoy',       roleTitle: 'Manager, Security Architecture' },
  { firstName: 'Kris',         lastName: 'Gold',       roleTitle: 'Solution Architect, Online Banking' },
  { firstName: 'Isaac',        lastName: 'Smith',      roleTitle: 'Manager, Application Solutions' },
  { firstName: 'Payton',       lastName: 'Frost',      roleTitle: 'Lead Developer, Online Banking' },
  { firstName: 'Samantha',     lastName: 'Nettle',     roleTitle: 'Manager, Operational Risk' },
  { firstName: 'Yolanda',      lastName: 'Ferreira',   roleTitle: 'Manager, Vendor Relations' },
  { firstName: 'Samir',        lastName: 'Hassan',     roleTitle: 'Manager, Purchasing' },
  { firstName: 'Yuna',         lastName: 'Aikawa',     roleTitle: 'Manager, Communications' },
  { firstName: 'Jonathan',     lastName: 'Carberry',   roleTitle: 'Manager, Customer Experience and Community Engagement' },
  { firstName: 'Roland',       lastName: 'Wei',        roleTitle: 'Manager of Sales' },
  { firstName: 'Pran',         lastName: 'Singh',      roleTitle: 'Manager, Marketing' },
  { firstName: 'Linda',        lastName: 'Analyst',    roleTitle: 'Business Analyst, Online Banking' },
  { firstName: 'Esra',         lastName: 'Sedge',      roleTitle: 'Manager, Contract Management' },
  { firstName: 'Pranee',       lastName: 'Tan',        roleTitle: 'Manager, Compliance Management' },
  { firstName: 'Karmen',       lastName: 'Spruce',     roleTitle: 'Manager, IT End User Service Desk' },
  { firstName: 'Haydar',       lastName: 'Katirci',    roleTitle: 'Manager, IT End User Computing' },
  { firstName: 'Jill',         lastName: 'Harkness',   roleTitle: 'Manager, IT Telecom and Infrastructure' },
  { firstName: 'Tim',          lastName: 'Morrison',   roleTitle: 'Manager, Data Center and Hosting Services' },
  { firstName: 'Aleksandr',    lastName: 'Milosevic',  roleTitle: 'Manager, IT Risk Management' },
  { firstName: 'Jim',          lastName: 'Wingnut',    roleTitle: 'Manager, IT Project Management Office' },
];

async function main() {
  console.log('Seeding database...');

  // ── Departments and Employees ────────────────────────────────────────────
  for (const dept of departmentData) {
    const department = await prisma.department.create({
      data: {
        name: dept.name,
        employees: {
          create: dept.employees.map((emp) => ({
            firstName: emp.firstName,
            lastName: emp.lastName ?? null,
          })),
        },
      },
    });
    console.log(`  Created department: ${department.name} (${dept.employees.length} employees)`);
  }

  // ── Leadership Members ───────────────────────────────────────────────────
  for (const member of leadershipData) {
    await prisma.leadershipMember.create({
      data: {
        firstName: member.firstName,
        lastName:  member.lastName ?? null,
        roleTitle: member.roleTitle,
      },
    });
  }
  console.log(`  Created ${leadershipData.length} leadership members.`);

  console.log('Seeding complete.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
