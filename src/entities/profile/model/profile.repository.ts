import { getProfileApi } from "@/shared/api/profile/get-profile"
import { queryOptions, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ProfileSchema } from "./profile.type"
import { editNicknameApi } from "@/shared/api/profile/edit-nickname"
import { toaster } from "@/shared/ui/toaster"
import { changePasswordApi } from "@/shared/api"
import { zodSaveParse } from "@/shared/lib/utils/zod-save-parse"
import { AxiosError } from "axios"

const profileQueryOptions = queryOptions({
  queryKey: ['profile'],
  queryFn: () => getProfileApi(),
})

const useProfileQuery = () => {
  const { data, ...query } = useQuery(profileQueryOptions);

  const profile = zodSaveParse(data?.data, ProfileSchema.optional());

  return { profile: profile, ...query }
}

const useProfileMutation = () => {
  const queryClient = useQueryClient();

  const editNicknameMutation = useMutation({
    mutationFn: (nickname: string) => editNicknameApi({ nickname }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toaster.success({
        description: 'You have successfully changed your nickname',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  })

  const changePasswordMutation = useMutation({
    mutationFn: (data: { password: string, newPassword: string }) => changePasswordApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      toaster.success({
        description: 'You have successfully changed your password',
      })
    },
    onError: (error: AxiosError<string[]>) => {
      toaster.error({
        title: error.message,
        description: error.response?.data[0],
      })
    }
  })

  return { 
    editNickname: editNicknameMutation.mutateAsync,
    changePassword: changePasswordMutation.mutateAsync,
  }
}

export const profileRepository = {
  useProfileQuery,
  useProfileMutation,
}