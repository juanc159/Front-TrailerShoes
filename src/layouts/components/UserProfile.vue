<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/useAuthenticationStore';
import avatar1 from '@images/avatars/avatar-1.png';
const authenticationStore = useAuthenticationStore()

const router = useRouter()
const logout = () => {
  authenticationStore.logout()
  router.push('/login')
}

</script>

<template>
  <VDivider class="mx-3" :thickness="2" inset vertical />
  <VBtn class="cursor-pointer pa-1 px-md-2 text-body-1 text-md-subtitle-1" color="default" variant="text"
    append-icon="mdi-menu-down" title="">
    {{ authenticationStore.user.name }}

    <!-- SECTION Menu -->
    <VMenu activator="parent" width="230" location="bottom end" offset="14px">

      <VList class="py-0">
        <!-- Profile -->
        <VListItem class="mx-0 mb-0" link to="/profile?mode=form">
          <template #prepend>
            <VIcon class="me-2" icon="tabler-user" size="22" />
          </template>
          <VListItemTitle>
            Profile
          </VListItemTitle>
        </VListItem>
        <VDivider class="my-0" />
        <!-- Logout -->
        <VListItem class="mx-0 mt-0" @click="logout()">
          <template #prepend>
            <VIcon class="me-2" icon="tabler-logout" size="22" />
          </template>

          <VListItemTitle>Cerrar sesion</VListItemTitle>
        </VListItem>
      </VList>

    </VMenu>
  </VBtn>

  <!-- <VBadge dot location="bottom right" offset-x="3" offset-y="3" bordered color="success">
    <VAvatar class="cursor-pointer" color="primary" variant="tonal">
      <VImg :src="avatar1" />
      <VMenu activator="parent" width="230" location="bottom end" offset="14px">
        <VList>
          <VListItem>
            <template #prepend>
              <VListItemAction start>
                <VBadge dot location="bottom right" offset-x="3" offset-y="3" color="success">
                  <VAvatar color="primary" variant="tonal">
                    <VImg :src="avatar1" />
                  </VAvatar>
                </VBadge>
              </VListItemAction>
            </template>

            <VListItemTitle class="font-weight-semibold">
              John Doe
            </VListItemTitle>
            <VListItemSubtitle>Admin</VListItemSubtitle>
          </VListItem>

          <VDivider class="my-2" />
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-user" size="22" />
            </template>

            <VListItemTitle>Profile</VListItemTitle>
          </VListItem>
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-settings" size="22" />
            </template>

            <VListItemTitle>Settings</VListItemTitle>
          </VListItem>
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-currency-dollar" size="22" />
            </template>

            <VListItemTitle>Pricing</VListItemTitle>
          </VListItem>
          <VListItem link>
            <template #prepend>
              <VIcon class="me-2" icon="tabler-help" size="22" />
            </template>

            <VListItemTitle>FAQ</VListItemTitle>
          </VListItem>
          <VDivider class="my-2" />
          <VListItem @click="logout()">
            <template #prepend>
              <VIcon class="me-2" icon="tabler-logout" size="22" />
            </template>

            <VListItemTitle>Logout</VListItemTitle>
          </VListItem>
        </VList>
      </VMenu>
    </VAvatar>
  </VBadge> -->
</template>
