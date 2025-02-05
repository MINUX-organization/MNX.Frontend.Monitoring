import { Editable, IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

export interface EditableInputProps extends Editable.RootProps {
  inputprops?: Editable.InputProps
  onSave?: (value: string) => void
}

export function UiEditableInput({ inputprops, value, onSave, ...props }: EditableInputProps) {
  const [name, setName] = useState(value)

  useEffect(() => {
    setName(value)
  }, [value])

  return (
    <Editable.Root
      onValueCommit={(item) => onSave?.(item.value)}
      onValueRevert={(item) => setName(item.value)}
      activationMode={'dblclick'}
      {...props}  
      value={name} 
      textStyle={'md'} 
      fontSize={'md'}
      > 
      <Editable.Preview />
      <Editable.Input 
        {...inputprops} 
        onChange={(e) => setName(e.target.value)} 
        colorPalette="input" 
        rounded={'md'} 
        required
      />
      <Editable.Control>
        <Editable.EditTrigger asChild>
          <IconButton variant="ghost">
            <LuPencilLine />
          </IconButton>
        </Editable.EditTrigger>
        <Editable.SubmitTrigger asChild>
          <IconButton variant="outline">
            <LuCheck />
          </IconButton>
        </Editable.SubmitTrigger>
        <Editable.CancelTrigger asChild>
          <IconButton variant="outline">
            <LuX />
          </IconButton>
        </Editable.CancelTrigger>
      </Editable.Control>
    </Editable.Root>
  )
}