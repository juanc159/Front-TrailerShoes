import type IList from '@/pages/Audit/Interfaces/IList'
import axiosIns from '@/plugins/axios'
import { defineStore } from 'pinia'


export const useCrudAuditStore = defineStore('useCrudAuditStore', {
  state: () => ({
    loading: false as boolean,
    typeAction: "list" as string,
    keyList: 0 as number,
    logInfos: [] as Array<IList>,
    totalData: 0 as number,
    totalPage: 0 as number,
    currentPage: 1 as number,
    lastPage: 0 as number,
  }),
  getters: {
  },
  actions: {
    async fetchAll(params: object): Promise<void> {
      this.loading = true
      await axiosIns.post(
        '/audit-list',
        params,
      ).then(result => {
        this.loading = false
        this.logInfos = result.data.logInfos
        this.totalData = result.data.totalData
        this.totalPage = result.data.totalPage
        this.currentPage = result.data.currentPage
        this.lastPage = result.data.lastPage
      }).catch(error => {
        this.loading = false
        console.log("error", error)
      })
    },
  },
})
