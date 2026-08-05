// queryKeys.ts — centralised query key definitions for TanStack Query.
//
// Keeping keys in one place means:
//   - Invalidating a query after a mutation is a single import away
//   - Typos in string keys are caught at compile time
//   - Related keys can be grouped for bulk invalidation
//
// Convention: array keys allow TanStack Query to invalidate whole groups.
// e.g. invalidating ['departments'] also invalidates ['departments', 'list'].

export const queryKeys = {
  departments: {
    all: ['departments'] as const,
    list: () => [...queryKeys.departments.all, 'list'] as const,
  },
  organization: {
    all: ['organization'] as const,
    list: () => [...queryKeys.organization.all, 'list'] as const,
  },
};
