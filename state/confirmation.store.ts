import { defineStore } from "pinia";

export const useConfirmation = defineStore("confirmationStore", {
  state: () => ({
    showConfirmation: false,
    message: "",
    action: null as unknown as () => void
  }),
  actions: {
    show(message: string, action: () => void) {
      this.message = message;
      this.action = action
      this.showConfirmation = true;
    },
  },
});
