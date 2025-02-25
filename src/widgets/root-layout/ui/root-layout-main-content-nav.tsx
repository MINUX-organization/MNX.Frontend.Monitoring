import { UiText } from "@/shared/ui";
import { Button, Group, GroupProps, Heading } from "@chakra-ui/react";
import { useLocation, useRouter } from "@tanstack/react-router";
import _ from "lodash";
import { BsArrowLeft } from "react-icons/bs";

function formatPath(path: string): string {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  return _.chain(path)
    .split('/')
    .filter(Boolean)
    .map(part => {
      if (uuidRegex.test(part)) {
        return 'Item';
      }
      
      return _.chain(part)
        .split('-')
        .filter(Boolean)
        .map(word => 
          word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
        .value();
    })
    .join(' => ')
    .value();
}

export function RootLayoutMainContentNav({ ...props }: GroupProps) {
  const router = useRouter();
  const location = useLocation();
  const currentPath = location.pathname;

  const canGoBack = router.history.canGoBack();

  const handleGoBack = () => router.history.back();

  return (
    <Group {...props}>
      <Button
        onClick={handleGoBack}
        disabled={!canGoBack}
        bg={'bg.transparent'}
        _hover={{ bg: 'bg.hover' }}
        border={'1px solid'}
        borderColor={'minux.solid'}
        rounded={'full'}
        p={0}
        size="sm"
      >
        <BsArrowLeft fill="white"/>
      </Button>
      <Heading fontSize="md" fontWeight="bold" mx={2}>
        {formatPath(currentPath) || 'Home'}
      </Heading>
    </Group>
  )
}