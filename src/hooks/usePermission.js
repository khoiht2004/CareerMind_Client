import { useSelector } from "react-redux";

function hasPermission(user, permission) {
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const perms = user.permissions;
  if (!Array.isArray(perms)) return false;
  if (perms.includes("*")) return true;
  return perms.includes(permission);
}

// Kiểm tra 1 quyền cụ thể
export function usePermission(permission) {
  const user = useSelector((state) => state.auth.user);
  return hasPermission(user, permission);
}

// Kiểm tra có ít nhất 1 trong các quyền được truyền vào (OR logic)
export function useAnyPermission(...permissions) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const perms = user.permissions;
  if (!Array.isArray(perms)) return false;
  if (perms.includes("*")) return true;
  return permissions.some((p) => perms.includes(p));
}

// Kiểm tra có đủ tất cả các quyền được truyền vào (AND logic)
export function useAllPermissions(...permissions) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const perms = user.permissions;
  if (!Array.isArray(perms)) return false;
  if (perms.includes("*")) return true;
  return permissions.every((p) => perms.includes(p));
}
