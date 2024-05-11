import { defineStore } from "pinia";
import type Alert from "../utils/interface/Alert";

export const useAlertStore = defineStore("useAlertStore", {
  state: () => ({
    alerts: [] as Alert[],
  }),
  actions: {
    show(description: string) {

        const id = new Date().getTime()

        this.alerts.push({
            description: description,
            id
        })
        
        setTimeout(() => {
            const index = this.alerts.findIndex(a => a.id === id)
            this.alerts.splice(index, 1)
        }, 10000)
    }
  }
});
