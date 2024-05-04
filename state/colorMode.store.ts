import { ColorMode } from "../utils/enums/ColorMode";
import { defineStore } from "pinia";

export const useColorModeStore = defineStore("colorModeStore", {
  state: () => ({
    currentMode: ColorMode.Light as ColorMode,
  }),
  actions: {
    switchColorModeHandler() {
        if (this.currentMode === ColorMode.Light) {
            document.body.classList.add('dark')
            this.currentMode = ColorMode.Dark
        } else {
            document.body.classList.remove('dark')
            this.currentMode = ColorMode.Light
        }
    }
  }
});
