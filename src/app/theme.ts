import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  theme: {
    tokens: {
      colors: {
        minux: {
          solid: { value: "rgba(60, 158, 165, 1)", description: "standart blue minux" },
          soft: { value: "rgba(60, 158, 165, 0.5)", description: "standart blue minux" },
        }
      },
    },
    semanticTokens: {
      colors: {
        bg: {
          DEFAULT: { value: { _dark: "#1F1F24", _light: "#FFFFFF" }, },
          subtle: { value: { _dark: "#20202A", _light: "#0B0B0B" }, },
          panel: { value: { _dark: "#242834", _light: "#FFFFFF" }, },
        }
      },
    }
  },
})

export const system = {
  ...createSystem(defaultConfig, config), 
}