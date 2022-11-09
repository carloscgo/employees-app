/* eslint-disable @typescript-eslint/no-explicit-any */
export type IFunc = (...props: any) => { /* */ }
export type IPaginate = { limit: number, skip: number }
export type ILoading = { show: boolean }

export interface Paginate extends IPaginate {
    total: number;
}
