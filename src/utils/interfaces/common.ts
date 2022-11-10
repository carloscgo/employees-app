/* eslint-disable @typescript-eslint/no-explicit-any */
export type IFunc = (...props: any) => any
export type IPaginate = { limit: number, skip: number }
export type ILoading = { show: boolean }
export type ITypeForm = {
  type: 'new' | 'edit'
}

export interface Paginate extends IPaginate {
  total: number;
}
