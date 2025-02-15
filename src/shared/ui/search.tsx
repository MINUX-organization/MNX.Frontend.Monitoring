import { InputProps } from "@chakra-ui/react";
import { SearchIcon } from "../assets/svg";
import { UiInput } from "./input";
import { InputGroup, InputGroupProps } from "./input-group";
import { CloseButton } from "./close-button";
import _ from "lodash";

export interface UiSearchProps extends InputProps {
  inputGroupporps?: InputGroupProps;
  onQueryClear?: () => void
}

export function UiSearch({ inputGroupporps, onQueryClear, ...props }: UiSearchProps) {
  const hadndleClearQuery = () => onQueryClear?.()

  return (
    <InputGroup 
      w={"100%"}
      startElement={<SearchIcon />} 
      endElement={!_.isEmpty(props.value) && <CloseButton 
        onClick={hadndleClearQuery} 
        _hover={{ color: "red.500" }}
        cursor={"pointer"}
        transition={"all 0.2s ease-in-out"}
        unstyled
      />} 
      {...inputGroupporps}
    >
      <UiInput placeholder={"Search..."} {...props}/>
    </InputGroup>
  )
}