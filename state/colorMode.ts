import { ColorMode } from "~/utils/enums/ColorMode";

export const useColorModeStore = defineStore("colorModeStore", {
  state: () => ({
    currentMode: ColorMode.Light as ColorMode,
  }),
  actions: {
    switchColorModeHandler() {
        console.log(document, 'd')
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
