const departments = [
  {
    name: "Administration",
    employees: [
      { firstName: "Zoë", lastName: "Robins" },
      { firstName: "Madeleine", lastName: "Madden" },
    ],
  },
  {
    name: "Audit",
    employees: [
      { firstName: "Josha", lastName: "Sadowski" },
      { firstName: "Kate", lastName: "Fleetwood" },
    ],
  },
  {
    name: "Banking Operations",
    employees: [
      { firstName: "Priyanka", lastName: "Bose" },
      { firstName: "Hammed", lastName: "Animashaun" },
      { firstName: "Álvaro", lastName: "Morte" },
      { firstName: "Taylor", lastName: "Napier" },
      { firstName: "Alan", lastName: "Simmonds" },
    ],
  },
  {
    name: "Communications",
    employees: [
      { firstName: "Gil", lastName: "Cardinal" },
      { firstName: "Richard J.", lastName: "Lewis" },
    ],
  },
  {
    name: "Corporate Services",
    employees: [
      { firstName: "Randy", lastName: "Bradshaw" },
      { firstName: "Tracey", lastName: "Cook" },
      { firstName: "Lubomir", lastName: "Mykytiuk" },
    ],
  },
  {
    name: "Facilities",
    employees: [
      { firstName: "Dakota", lastName: "House" },
      { firstName: "Lori Lea", lastName: "Okemah" },
      { firstName: "Renae", lastName: "Morrisseau" },
      { firstName: "Rick", lastName: "Belcourt" },
    ],
  },
  {
    name: "Financial Services",
    employees: [
      { firstName: "Selina", lastName: "Hanusa" },
      { firstName: "Buffy", lastName: "Gaudry" },
      { firstName: "Shaneen Ann", lastName: "Fox" },
      { firstName: "Allan", lastName: "Little" },
      { firstName: "Danny", lastName: "Rabbit" },
    ],
  },
  {
    name: "Human Resources",
    employees: [
      { firstName: "Jesse Ed", lastName: "Azure" },
      { firstName: "Stacy", lastName: "Da Silva" },
      { firstName: "Vladimír", lastName: "Valenta" },
      { firstName: "Samone", lastName: "Sayeses-Whitney" },
      { firstName: "Paul", lastName: "Coeur" },
    ],
  },
  {
    name: "Information Technology",
    employees: [
      { firstName: "Graham", lastName: "Greene" },
      { firstName: "Sandika", lastName: "Evergreen" },
      { firstName: "Jennifer", lastName: "Rodriguez" },
    ],
  },
  {
    name: "IT Technician",
    employees: [
      { firstName: "Aiyana", lastName: "Littlebear" },
      { firstName: "Inara", lastName: "Thunderbird" },
      { firstName: "Kaya", lastName: "Runningbrook" },
      { firstName: "Elara", lastName: "Firehawk" },
      { firstName: "Siona", lastName: "Moonflower" },
      { firstName: "Kaiyu", lastName: "Greywolf" },
      { firstName: "Ayawamat", lastName: "Nightwind" },
      { firstName: "Tala", lastName: "Braveheart" },
      { firstName: "Iniko", lastName: "Stonebear" },
      { firstName: "Onatah", lastName: "Redhawk" },
    ],
  },
];

function getInitials(employee) {
  const first = employee.firstName.charAt(0).toUpperCase();
  const last = employee.lastName ? employee.lastName.charAt(0).toUpperCase() : "";
  return first + last;
}

function getFullName(employee) {
  return employee.lastName
    ? `${employee.firstName} ${employee.lastName}`
    : employee.firstName;
}

function renderDirectory() {
  const main = document.getElementById("main-content");
  if (!main) return;

  departments.forEach((dept) => {
    // <section> for each department
    const section = document.createElement("section");
    section.classList.add("dept-section");
    section.setAttribute("aria-labelledby", `dept-${dept.name.replace(/\s+/g, "-").toLowerCase()}`);

    // Department heading
    const heading = document.createElement("h2");
    heading.classList.add("dept-heading");
    heading.id = `dept-${dept.name.replace(/\s+/g, "-").toLowerCase()}`;
    heading.textContent = dept.name;
    section.appendChild(heading);

    // Employee list
    const ul = document.createElement("ul");
    ul.classList.add("employee-list");

    dept.employees.forEach((employee) => {
      const li = document.createElement("li");
      li.classList.add("employee-card");

      const avatar = document.createElement("div");
      avatar.classList.add("employee-avatar");
      avatar.setAttribute("aria-hidden", "true");
      avatar.textContent = getInitials(employee);

      // Name
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("employee-name");
      nameSpan.textContent = getFullName(employee);

      li.appendChild(avatar);
      li.appendChild(nameSpan);
      ul.appendChild(li);
    });

    section.appendChild(ul);
    main.appendChild(section);
  });
}
function renderYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderYear();
  renderDirectory();
});
