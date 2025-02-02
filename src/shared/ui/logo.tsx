import { Heading, Stack, StackProps, SystemStyleObject } from "@chakra-ui/react";
import { MinuxLogoIcon } from "../assets/svg/minux-logo-icon";
import { motion } from 'motion/react'

const MHeadeing = motion.create(Heading)
const MMinuxLogoIcon = motion.create(MinuxLogoIcon)

export interface MinuxLogoProps extends StackProps {
  textClassName?: SystemStyleObject
}

export function MinuxLogo({ textClassName, ...props }: MinuxLogoProps) {
  return (
    <Stack {...props} direction={'row'} align={'center'} gap={4} userSelect={'none'}>
      <MMinuxLogoIcon
        initial={{ filter: 'drop-shadow(0 0 16px rgba(60, 158, 165, 0.5))'}}
        animate={{
          filter: [
            'drop-shadow(0 0 16px rgba(60, 158, 165, 0.5))',
            'drop-shadow(0 0 22px rgba(60, 158, 165, 1))', 
            'drop-shadow(0 0 16px rgba(60, 158, 165, 0.5))',
          ],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeIn',
        }}
      /> 
      <MHeadeing
        css={textClassName}
        fontSize={'3xl'}
        letterSpacing={'0.5em'}  
        background={'linear-gradient(to right, #c0c0c0 20%, rgba(60, 158, 165, 1) 30%, rgba(60, 158, 165, 1) 70%,  #c0c0c0 80%)'}
        backgroundClip={'text'}
        WebkitTextFillColor={'transparent'}
        backgroundSize={'500% auto'}
        filter={""}
        overflow={'hidden'}
        initial={{ backgroundPosition: '0% 50%'}}
        animate={{ backgroundPosition: '100% 50%'}}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
      >
          MINUX
      </MHeadeing>
    </Stack>
  )
}