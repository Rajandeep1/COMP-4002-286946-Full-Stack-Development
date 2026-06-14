// RoleRow — displays a single leadership member's name on the left
// and their role/title on the right, as a table row.
// Updated to use the Role interface which now includes an id field.

import { Role } from '../types';

interface RoleRowProps {
  person: Role;
}

const RoleRow = ({ person }: RoleRowProps) => (
  <tr className="role-row">
    <td className="role-name">{person.name}</td>
    <td className="role-title">{person.role}</td>
  </tr>
);

export default RoleRow;
