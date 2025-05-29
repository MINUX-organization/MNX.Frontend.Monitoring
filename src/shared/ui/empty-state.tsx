import { chakra, EmptyState, EmptyStateRootProps } from "@chakra-ui/react";
import { FC, ReactNode } from "react";
import { ImFileEmpty } from "react-icons/im";
import { UiText } from "./text";

export interface UiEmptyStateProps extends EmptyStateRootProps {
  renderIndicator?: () => ReactNode,
  renderTitle?: () => ReactNode,
  renderDescription?: () => ReactNode,  
}

const Icon = chakra(ImFileEmpty)

export const UiEmptyState: FC<UiEmptyStateProps> = ({ 
  renderIndicator, 
  renderTitle, 
  renderDescription, 
  ...props 
}) => {
  return (
    <EmptyState.Root {...props}>
      <EmptyState.Content>
        <EmptyState.Indicator>
          {renderIndicator?.() ?? <Icon w={16} h={16}/>}
        </EmptyState.Indicator>
        <EmptyState.Title>
          {renderTitle?.() ?? 'The list is empty'}
        </EmptyState.Title>
        <EmptyState.Description>
          {renderDescription?.() ?? <UiText>Try to create an entity!</UiText>}
        </EmptyState.Description>
      </EmptyState.Content>
    </EmptyState.Root>
  )
}