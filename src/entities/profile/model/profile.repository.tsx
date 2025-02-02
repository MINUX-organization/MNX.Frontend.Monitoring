import { getProfileApi } from "@/shared/api/get/getProfile";
import { ZodSaveParse } from "@/shared/lib/utils/zod-save-parse";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ProfileInfo } from "./types";
import { editNicknameApi } from "@/shared/api/patch/editNickname";
import { IS_SUCCESS_STATUS } from "@/shared/api/api-instance";
import { editPasswordApi } from "@/shared/api/put/editPassword";

export function useProfileRepository() {
  const queryClient = useQueryClient();
  const { data, ...query } = useQuery(['profile'], getProfileApi);

  const profileInfo = ZodSaveParse(data?.data, ProfileInfo.optional());

  const editNicknameMutation = useMutation({
    mutationFn: (nickname: string) => editNicknameApi(nickname),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  })        

  const editPasswordMutation = useMutation({
    mutationFn: (data: {newPassword: string, password: string, login: string}) => editPasswordApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['profile']);
    }
  })

  const editPassword = async (data: {password: string, newPassword: string, login: string}) => {
    const result = await editPasswordMutation.mutateAsync(data);

    return IS_SUCCESS_STATUS(result.status);
  }

  const editNickname = async (nickname: string) => {
    const result = await editNicknameMutation.mutateAsync(nickname);

    return IS_SUCCESS_STATUS(result.status);
  }

  return {
    profileInfo,
    editNickname,
    editPassword,
    ...query
  }
}