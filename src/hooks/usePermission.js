import { useSelector } from "react-redux";

function hasPermission(user, permission) {
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  const perms = user.permissionList ?? user.permissions;
  if (Array.isArray(perms)) {
    if (perms.includes("*")) return true;
    return perms.includes(permission);
  }
  if (!perms || typeof perms !== "object") return false;
  if (perms.system?.includes("*")) return true;
  const [group] = permission.split(":");
  return Array.isArray(perms[group]) && perms[group].includes(permission);
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
  return permissions.some((p) => hasPermission(user, p));
}

// Kiểm tra có đủ tất cả các quyền được truyền vào (AND logic)
export function useAllPermissions(...permissions) {
  const user = useSelector((state) => state.auth.user);
  if (!user) return false;
  if (user.role === "ADMIN") return true;
  return permissions.every((p) => hasPermission(user, p));
}
