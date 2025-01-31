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
          DEFAULT: { value: "#0B0B0B" },
          subtle: { value: "#20202A" },
        }
      },
    }
  },
})

export const system = {
  ...createSystem(defaultConfig, config), 
}