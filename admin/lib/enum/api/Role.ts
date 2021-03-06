/**
 * 権限.
 */
export const Role = {
  /**
   * システム管理者.
   */
  SYSTEM: 'SYSTEM',

  /**
   * AdminUser: 管理者
   * CircleUser: サークル部長.
   */
  MANAGER: 'MANAGER',

  /**
   * 一般.
   */
  COMMON: 'COMMON',
} as const

export type RoleKey = keyof typeof Role
export type Role = typeof Role[keyof typeof Role]

/**
 * 権限.
 */
export const getAllRole = (): Role[] => Object.values(Role)
/**
 * 権限.
 */
export const getAllRoleKey = (): RoleKey[] => Object.keys(Role) as RoleKey[]
/**
 * 権限.
 */
export const isRole = (s: any): s is Role => Object.values(Role).includes(s)

/**
 * システム管理者.
 */
export const isSystem = (v: any): v is 'SYSTEM' => v === Role.SYSTEM
/**
 * AdminUser: 管理者
 * CircleUser: サークル部長.
 */
export const isManager = (v: any): v is 'MANAGER' => v === Role.MANAGER
/**
 * 一般.
 */
export const isCommon = (v: any): v is 'COMMON' => v === Role.COMMON
