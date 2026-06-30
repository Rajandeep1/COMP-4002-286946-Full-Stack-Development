// employeeRepo — the sole manager of Department and Employee data on the
// front-end. Now requests this data from the back-end API rather than
// holding it in local in-memory storage.
//
// Responsibilities (this layer only):
//   - Make network requests to the back-end's /api/departments routes
//   - Return the parsed JSON response to the caller
//
// This layer does NOT validate business rules — that belongs to the service
// (and is now also enforced server-side). This layer does NOT know about
// React state — that belongs to the page/hook calling it.

import { Department, Employee } from '../types';

// In GitHub Codespaces, "localhost" inside the browser does not reach the
// container's ports directly — each port is forwarded to a unique HTTPS URL
// instead. Codespaces injects window.location with a hostname like
// "musical-acorn-97j9xxxxx-5173.app.github.dev" for the front-end.
// We detect that pattern and rewrite it to point at port 3001 instead.
// On a normal local machine, window.location.hostname is just "localhost",
// so this falls back to the standard local URL.
const getApiBase = (): string => {
  const { hostname, protocol } = window.location;

  // Codespaces hostnames look like: <name>-<port>.app.github.dev
  const codespacesMatch = hostname.match(/^(.*)-\d+\.app\.github\.dev$/);

  if (codespacesMatch) {
    const baseName = codespacesMatch[1];
    return `${protocol}//${baseName}-3001.app.github.dev/api`;
  }

  return 'http://localhost:3001/api';
};

const API_BASE = getApiBase();

const employeeRepo = {
  // GET /api/departments
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_BASE}/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments.');
    return res.json();
  },

  // POST /api/departments/:departmentName/employees
  // Returns the updated department list on success, or null if the
  // back-end rejected the request (e.g. validation failure).
  async addEmployee(
    departmentName: string,
    employee: Employee
  ): Promise<Department[] | null> {
    const res = await fetch(
      `${API_BASE}/departments/${encodeURIComponent(departmentName)}/employees`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(employee),
      }
    );

    if (!res.ok) return null;
    return res.json();
  },
};

export default employeeRepo;
