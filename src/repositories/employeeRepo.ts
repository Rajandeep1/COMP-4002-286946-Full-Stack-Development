// employeeRepo — fetches from the backend API.
// GET requests are public. POST requests include the Clerk session token
// in the Authorization header so the backend can verify the user is signed in.

import { Department } from '../types';
import { API_BASE } from '../apiBase';

const employeeRepo = {
  async getDepartments(): Promise<Department[]> {
    const res = await fetch(`${API_BASE}/departments`);
    if (!res.ok) throw new Error('Failed to fetch departments.');
    return res.json();
  },

  // token: obtained from Clerk's useAuth().getToken() in the calling component
  async addEmployee(
    departmentName: string,
    firstName: string,
    lastName: string | null,
    token: string
  ): Promise<Department[] | null> {
    const res = await fetch(`${API_BASE}/departments/employees`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Clerk token — verified by requireAuth middleware on the backend
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ departmentName, firstName, lastName }),
    });

    if (!res.ok) return null;
    return res.json();
  },
};

export default employeeRepo;
