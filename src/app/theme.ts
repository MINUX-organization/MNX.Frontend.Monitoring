import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const config = defineConfig({
  cssVarsPrefix: "mnx",
  globalCss: {
    "*::selection": {
      bg: "rgba(60, 158, 165, 1)",
    },
    html: {
      overflow: "hidden",
    },
  },
  theme: {
    tokens: {
      sizes: {
        "4xs": { value: "8.125rem" }
      },
      colors: {
        tech: {
          nvidia: { value: "#76B900" },
          amd: { value: "#ED1C24" },
          intel: { value: "#0071C5" },
        },
        minux: {
          solid: {
            value: "rgba(60, 158, 165, 1)",
            description: "standard blue minux color"
          },
          soft: {
            value: "rgba(60, 158, 165, 0.5)",
            description: "standard blue minux with 50% opacity"
          },
        }
      },
    },
    semanticTokens: {
      colors: {
        input: {
          solid: { value: "#212327", description: "standard input color" },
          focusRing: {
            value: "#EC790F",
            description: "color for focus rings or outlines (e.g., on hover)"
          },
        },
        accept: {
          solid: {
            value: "rgba(60, 158, 165, 1)",
            description: "standard blue minux color"
          },
          soft: {
            value: "rgba(60, 158, 165, 0.5)",
            description: "standard blue minux with 50% opacity"
          },
          contrast: {
            value: "white",
            description: "contrast color for text or elements on top of minux.solid"
          },
          fg: {
            value: "rgba(60, 158, 165, 0.9)",
            description: "main color for text or foreground elements"
          },
          muted: {
            value: "rgba(60, 158, 165, 0.7)",
            description: "muted variant for secondary elements"
          },
          subtle: {
            value: "rgba(60, 158, 165, 0.3)",
            description: "very light variant for backgrounds or subtle accents"
          },
          emphasized: {
            value: "rgba(40, 120, 130, 1)",
            description: "darker and more saturated variant for emphasis"
          },
          focusRing: {
            value: "rgba(60, 158, 165, 0.8)",
            description: "color for focus rings or outlines (e.g., on hover)"
          },
        },
        cancel: {
          solid: { value: "{colors.red.500}" },
          soft: {
            value: "rgba(255, 0, 0, 0.5)",
            description: "standard red cancel with 50% opacity"
          },
          contrast: {
            value: "white",
            description: "contrast color for text or elements on top of cancel.solid"
          },
          fg: {
            value: "rgba(255, 0, 0, 0.9)",
            description: "main color for text or foreground elements"
          },
          muted: {
            value: "rgba(255, 0, 0, 0.7)",
            description: "muted variant for secondary elements"
          },
          subtle: {
            value: "rgba(255, 0, 0, 0.3)",
            description: "very light variant for backgrounds or subtle accents"
          },
          emphasized: {
            value: "rgba(120, 40, 40, 1)",
            description: "darker and more saturated variant for emphasis"
          },
          focusRing: {
            value: "rgba(255, 0, 0, 0.8)",
            description: "color for focus rings or outlines (e.g., on hover)"
          }
        },
        bg: {
          DEFAULT: { value: { _dark: "#1F1F24", _light: "#FFFFFF" }, },
          subtle: { value: { _dark: "#20202A", _light: "#0B0B0B" }, },
          panel: { value: { _dark: "#242834", _light: "#FFFFFF" }, },
          input: { value: { _dark: "#212327", _light: "#FFFFFF" }, },
          transparent: { value: { _dark: "rgba(0, 0, 0, 0.2)", _light: "rgba(0, 0, 0, 0.2)" }, },
          hover: { value: { _dark: "rgba(255, 255, 255, 0.2)", _light: "rgba(0, 0, 0, 0.1)" }, },
        }
      },
    },
    
  },
})
  
export const system = {
  ...createSystem(defaultConfig, config), 
}