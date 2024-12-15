<script setup lang="ts">
import SiteLogo from './icons/SiteLogo.vue';
import MenuIcon from './icons/MenuIcon.vue';
import CloseIcon from './icons/CloseIcon.vue';
import LoginButton from './LoginButton.vue';
import BecomeAMemberButton from './BecomeAMemberButton.vue';
import SiteNavigation from './SiteNavigation.vue';
import { RouterLink} from 'vue-router';
import { useUpdateScreenWidth } from './composables/UpdateScreenWidth.js';
import 'element-closest-polyfill';
import { ref } from 'vue';

const 
  { screenWidth } = useUpdateScreenWidth(), 
  openNavMenu = ref(false)
;

function closeModal($evt: Event) {
  const goingTo =  $evt.srcElement || $evt.originalTarget;
  return goingTo.closest('#modal-area')? true : false;
}
</script>

<template>
  <div 
    :style="screenWidth <= 788? 'padding: 0.9375rem 0rem;' : 'padding: 0.9375rem 3.75rem;'" 
    :class="screenWidth <= 788? ['flex-wrap', 'justify-content-center', 'flex-direction-column'] : ['justify-content-space-between', 'flex-nowrap', 'flex-direction-row']" 
    class="flex-box align-items-center flex-w-100-percentage m-0"
  >
    <div class="align-self-stretch" :class="screenWidth <= 788? ['justify-content-center', 'flex-fill'] : 'justify-content-start'">
      <RouterLink to="/" class="site-logo d-block text-center">
        <SiteLogo />
      </RouterLink>
    </div>
    <div 
      :style="screenWidth <= 788? 'padding-top: 0.875rem' : 'padding-top: 0'" 
      class="flex-fill align-self-stretch" 
      :class="screenWidth <= 788? 'justify-content-center' : 'justify-content-end'"
    >
      <div 
        class="text-no-wrap h-100 flex-box flex-direction-row align-items-center flex-nowrap flex-w-100-percentage m-0" 
        :class="screenWidth <= 788? 'justify-content-center' : 'justify-content-end'"
      >
        <div style="padding-right: 1.5625rem;">
          <LoginButton />
        </div>
        <div :style="!(screenWidth >= 1200)? 'padding-right: 1.5625rem;' : 'padding-right: 0rem;'">
          <BecomeAMemberButton />
        </div>
        <template v-if="!(screenWidth >= 1200)">
          <div>
            <a @keyup.enter="openNavMenu=true" tabindex="0" class="d-block cursor-pointer" @click="openNavMenu=true">
              <MenuIcon />
            </a>
            <Teleport to="body">
              <Transition name="slide">
                <div v-if="openNavMenu" style="background-color: rgba(0, 0, 0, 0.5);" class="position-fixed vw-100 vh-100 t-0 r-0">
                  <div
                    class="scrollable w-100 h-100" 
                    @click="openNavMenu=closeModal($event)"
                  >
                    <div 
                      class="flex-box justify-content-end align-items-start flex-direction-row flex-w-100-percentage h-100 m-0 p-0"
                    >
                      <div 
                        class="align-self-stretch" 
                        :style="screenWidth <= 350? 'width:100%;' : 'width:320px;'"
                      >
                        <div class="flex-box flex-direction-row justify-content-start align-items-start flex-w-100-percent h-100 m-0 p-0">
                          <div class="position-relative" style="width:35px;height:30px;">
                            <div class="position-fixed t-0" style="padding-right:5px;width:30px;height:30px;background-color:transparent;">
                              <a @keyup.enter="openNavMenu=false" tabindex="0" class="d-block close-icon underline-none cursor-pointer"><CloseIcon /></a>
                            </div>
                          </div>
                          <div id="modal-area" class="flex-fill align-self-stretch">
                            <SiteNavigation style="z-index:350;" /> 
                          </div>
                        </div> 
                      </div>
                    </div>
                  </div>
                </div>
              </Transition>
            </Teleport>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
.site-logo svg:hover {
  fill: #ffba00;
  stroke: #ffba00;
}
.slide-enter-active {
  transition: all 0.3s ease-out;
}
.slide-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
  -webkit-transform: translateX(100%);
}
.close-icon svg:hover {
  fill:#ffba00;
}
.scrollable {
  transition: all 0.3s ease;
  overflow-y: auto !important;
  overflow-x: hidden !important;
}
</style>