import { Clipboard, ClipboardRootProps } from "@chakra-ui/react";
import { FC } from "react";
import { UiButton } from "./button";
import { UiText } from "./text";
import { FaRegCopy } from "react-icons/fa";
import { toaster } from "./toaster";

export const UiClipboard: FC<ClipboardRootProps & { label?: string }> = ({ label, ...props }) => {
  const handleCopy = () => {
    toaster.success({ title: "Copied to clipboard" })
  }

  return (
    <Clipboard.Root value="https://chakra-ui.com" {...props}>
      <Clipboard.Trigger asChild>
        <UiButton variant="surface" size="sm" onClick={handleCopy}>
          <FaRegCopy />
          {label && <UiText>{label}</UiText>}
        </UiButton>
      </Clipboard.Trigger>
    </Clipboard.Root>
  )
}