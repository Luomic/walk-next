<template>
  <div :class="styles.page">
    <team-form :loading="isCreatePending" submit-label="创建团队" @submit="handleCreateSubmit" />
  </div>
</template>

<script setup lang="ts">
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { showFailToast, showSuccessToast } from "vant";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

import TeamForm from "@/components/team-form/index.vue";
import type { TeamFormValue } from "@/components/team-form/types";
import { useClientUserData } from "@/composables";
import { CLIENT_QUERY_KEY } from "@/constants";
import { walkClientService } from "@/utils";

import styles from "./index.module.scss";

const router = useRouter();
const { t } = useI18n();
const queryClient = useQueryClient();
const { updateUserInfo } = useClientUserData();

const { mutate: mutateCreateTeam, isPending: isCreatePending } = useMutation({
  mutationFn: (value: TeamFormValue) =>
    walkClientService.CreateTeam({
      name: value.name,
      slogan: value.slogan,
      password: value.password,
      // eslint-disable-next-line camelcase
      allow_match: value.allowMatch,
      // eslint-disable-next-line camelcase
      route_name: value.routeName
    }),
  onSuccess: async () => {
    showSuccessToast({ message: t("创建成功！") });

    const userInfo = await queryClient.fetchQuery({
      queryKey: [CLIENT_QUERY_KEY.USER.SELF],
      queryFn: () => walkClientService.QueryUserInfo()
    });

    updateUserInfo(userInfo);

    router.replace({ name: "team-info" });
  },
  onError: (error: unknown) => {
    const message = error instanceof Error ? error.message : t("创建失败，请稍后重试");

    showFailToast({ message });
  }
});

const handleCreateSubmit = (value: TeamFormValue) => {
  if (isCreatePending.value) return;
  mutateCreateTeam(value);
};
</script>
