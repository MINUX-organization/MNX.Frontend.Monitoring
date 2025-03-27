import { Editable, IconButton } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { LuCheck, LuPencilLine, LuX } from "react-icons/lu"

export interface EditableInputProps extends Editable.RootProps {
  inputprops?: Editable.InputProps
  previewprops?: Editable.PreviewProps
  onSave?: (value: string) => void
}

export function UiEditableInput({ inputprops, previewprops, value, onSave, ...props }: EditableInputProps) {
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
      <Editable.Preview truncate textStyle={props.textStyle} {...previewprops}/>
      <Editable.Input 
        textStyle={props.textStyle}
        onChange={(e) => setName(e.target.value)} 
        colorPalette="input" 
        rounded={'md'} 
        required
        {...inputprops}
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