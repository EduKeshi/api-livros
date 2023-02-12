import { SetMetadata } from "@nestjs/common";
import { Permissions } from "src/enum/permission.enum";

export const ROLES_KEY = 'permissions';
export const RequierePermissions = (...roles: Permissions[]) => SetMetadata(ROLES_KEY, roles);