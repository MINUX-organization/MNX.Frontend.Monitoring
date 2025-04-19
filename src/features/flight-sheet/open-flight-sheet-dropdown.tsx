import { ChevronDownIcon } from "@/shared/assets/svg/chevron-down";
import { IconButton, IconButtonProps } from "@chakra-ui/react";
import { motion } from "motion/react";

export function OpenFlightSheetDropdown({ 
  setOpen, 
  open,
  ...props 
}: {
  setOpen: () => void, 
  open?: boolean
} & IconButtonProps) {
  return (
    <IconButton variant="ghost" className='group' aria-label="Open flight sheet" onClick={setOpen} {...props}>
      <motion.div
        animate={{ rotate: open ? 180 : 0 }}
      >
        <ChevronDownIcon />
      </motion.div>
    </IconButton>
  )
}