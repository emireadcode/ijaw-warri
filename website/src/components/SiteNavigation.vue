<script setup lang="ts">
import ArrowDown from './icons/ArrowDown.vue';
import { closeOrStillOpenDropdown } from './utility/';
import { RouterLink } from 'vue-router';
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useUpdateScreenWidth } from './composables/UpdateScreenWidth.js';

const 
  dropDownNav = ref(''), 
  { screenWidth } = useUpdateScreenWidth(),
  changeDropDownBGColor = computed(() => {
    return function(navType: 'PROJECTS' | 'EVENTS' | '') {
      if(dropDownNav.value === navType && navType !== '') {
        changeArrowDown(navType, '#fff');
        return 'background-color: #ffba00;color: #fff;';
      }
      else {
        if(navType !== '') {
          changeArrowDown(navType, '#00000');
        }
        return 'background-color: transparent;color:blue;';
      }
    }
  })
;
function changeArrowDown(id: 'PROJECTS' | 'EVENTS', color: string) {
  document.getElementById(id.toLowerCase()+'-link')?.querySelector('svg')?.setAttribute('fill', color);
}

function closeDropDown($evt: Event) {
  const goingTo =  $evt.srcElement || $evt.originalTarget;
  return (goingTo.closest('#projects') || goingTo.closest('#projects-link') || goingTo.closest('#events') || goingTo.closest('#events-link'))? 
  (
    (goingTo.closest('#projects') || goingTo.closest('#projects-link'))?
    'PROJECTS' : 'EVENTS'
  ) : '';
}

function closeDropDownEventEmitter($evt: Event) {
  dropDownNav.value = closeDropDown($evt);
}

onMounted(() => {
  document.addEventListener('click', closeDropDownEventEmitter);
  document.addEventListener('mousemove', closeDropDownEventEmitter);
  document.addEventListener('contextmenu', closeDropDownEventEmitter);
  document.addEventListener('dblclick', closeDropDownEventEmitter);
  document.addEventListener('mousedown', closeDropDownEventEmitter);
  document.addEventListener('mouseup', closeDropDownEventEmitter);
});

onUnmounted(() => {
  document.removeEventListener('click', closeDropDownEventEmitter);
  document.removeEventListener('mousemove', closeDropDownEventEmitter);
  document.removeEventListener('contextmenu', closeDropDownEventEmitter);
  document.removeEventListener('dblclick', closeDropDownEventEmitter);
  document.removeEventListener('mousedown', closeDropDownEventEmitter);
  document.removeEventListener('mouseup', closeDropDownEventEmitter);
});
</script>

<template>
  <nav 
    :style="!(screenWidth >= 1200)? 'padding: 0rem;background-color:#ebe9eb;' : 'padding: 0rem 3.75rem;background-color: #fff;'" 
    class="w-100" 
    :class="!(screenWidth >= 1200)? 'h-100' : ''"
  >
    <ul 
      :style="(screenWidth >= 1200)? 'box-shadow: 0 2px 4px 0 rgba(0,0,0,.2);' : ''"
      style="font-size: 0px;" 
      class="flex-w-100-percentage flex-box justify-content-start align-items-center flex-nowrap list-style-none m-0 p-0"
      :class="(screenWidth >= 1200)? ['flex-direction-row','border-tr-tl-radius-15-px'] : 'flex-direction-column'"
    >
      <li 
        :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : 'w-100'"
        class="align-self-stretch w-12-dot-5-percent border-black" 
        style="font-size: 0.875rem;"
      >
        <!-- Projects -->
        <a 
          tabindex="0" 
          id="projects-link" 
          @click="() => {
            dropDownNav = (screenWidth >= 1200)? 'PROJECTS' : '';
            (screenWidth >= 1200)? changeArrowDown('PROJECTS', '#fff') : '';
          }" 
          @focus="() => {
            dropDownNav = (screenWidth >= 1200)? 'PROJECTS' : '';
            (screenWidth >= 1200)? changeArrowDown('PROJECTS', '#fff') : '';
          }" 
          @keyup.enter="() => {
            dropDownNav = (screenWidth >= 1200)? 'PROJECTS' : '';
            (screenWidth >= 1200)? changeArrowDown('PROJECTS', '#fff') : '';
          }"
          @mouseover="() => {
            dropDownNav = (screenWidth >= 1200)? 'PROJECTS' : '';
            (screenWidth >= 1200)? changeArrowDown('PROJECTS', '#fff') : '';
          }" 
          @mouseleave="($event: Event) => {
            dropDownNav = screenWidth >= 1200? (closeOrStillOpenDropdown($event, ['projects'])? 'PROJECTS' : '') : '';
            (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
          }" 
          class="d-block underline-none" 
          :style="(screenWidth >= 1200)? changeDropDownBGColor('PROJECTS')+'padding:6px 0;' : 'padding:10px 0;background-color:#ebe9eb;'"
          :class="(screenWidth >= 1200)? ['nav-link', 'border-tr-tl-radius-15-px', 'cursor-pointer'] : ''"
        >
          <div :style="(screenWidth >= 1200)? 'padding-left:0.875rem;padding-right:0.875rem;' : 'padding-left:5px;'" class="flex-box flex-direction-row justify-content-space-between align-items-center flex-nowrap">
            <div :style="!(screenWidth >= 1200)? 'font-weight: bold' : ''">
              {{ (screenWidth >= 1200)? 'Projects' : 'PROJECTS' }}
            </div>
            <template v-if="(screenWidth >= 1200)">
              <div>
                <ArrowDown />
              </div>
            </template>
          </div>
        </a>
        <div class="position-relative d-block">
          <template v-if="(screenWidth >= 1200)">
            <template v-if="dropDownNav === 'PROJECTS'">
              <div 
                style="width:250px;" 
                @mouseleave="($event: Event) => {
                  dropDownNav = (closeOrStillOpenDropdown($event, ['projects-link', 'projects']) && screenWidth >= 1200)? 'PROJECTS' : '';
                  (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                }" 
                id="projects" 
                class="position-absolute"
              >
                <div class="d-block drop-down">
                  <ul style="font-size:0px;" class="flex-w-100-percentage flex-box flex-direction-column justify-content-start align-items-center flex-nowrap list-style-none m-0 p-0">
                    <li style="font-size:15px;" class="w-100 border-black">
                      <RouterLink 
                        to="/projects/completed" 
                        style="padding:8px 5px;" 
                        class="d-block underline-none cursor-pointer" 
                        @blur="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }" 
                        @mouseover="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }" 
                        @focus="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }" 
                      >
                        Completed Projects
                      </RouterLink>
                    </li>
                    <li style="font-size:15px;" class="w-100 border-black-no-top">
                      <RouterLink  
                        to="/projects/ongoing"
                        style="padding:8px 5px;" 
                        class="d-block underline-none cursor-pointer" 
                        @blur="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }"
                        @mouseover="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }"
                        @focus="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }"
                      >
                        Ongoing Projects
                      </RouterLink>
                    </li>
                    <li style="font-size:15px;" class="w-100 border-black-no-top">
                      <RouterLink 
                        to="/projects/uncommenced"
                        style="padding:8px 5px;" 
                        class="d-block underline-none cursor-pointer"  
                        @blur="() => {
                          dropDownNav = '';
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }" 
                        @mouseover="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }" 
                        @focus="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'PROJECTS'? changeArrowDown('PROJECTS', '#fff') : changeArrowDown('PROJECTS', '#00000')) : '';
                        }"
                      >
                        Uncommenced Projects
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="d-block drop-down">
              <ul style="font-size:0px;" class="flex-w-100-percentage flex-box flex-direction-column justify-content-start align-items-center flex-nowrap list-style-none m-0 p-0">
                <li style="font-size:15px;" class="w-100 border-black">
                  <RouterLink to="/projects/completed" style="padding:8px 5px;" class="d-block underline-none cursor-pointer">Completed Projects</RouterLink>
                </li>
                <li style="font-size:15px;" class="w-100 border-black-no-top">
                  <RouterLink to="/projects/ongoing" style="padding:8px 5px;" class="d-block underline-none cursor-pointer">Ongoing Projects</RouterLink>
                </li>
                <li style="font-size:15px;" class="w-100 border-black-no-top">
                  <RouterLink to="/projects/uncommenced" style="padding:8px 5px;" class="d-block underline-none cursor-pointer">Uncommenced Projects</RouterLink>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'border-black'] : ['w-100', 'border-black-no-top']"
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Events -->
        <a 
          tabindex="0" 
          id="events-link"  
          @click="() => {
            dropDownNav = (screenWidth >= 1200)? 'EVENTS' : '';
            (screenWidth >= 1200)? changeArrowDown('EVENTS', '#fff') : '';
          }" 
          @focus="() => {
            dropDownNav = (screenWidth >= 1200)? 'EVENTS' : '';
            (screenWidth >= 1200)? changeArrowDown('EVENTS', '#fff') : '';
          }" 
          @keyup.enter="() => {
            dropDownNav = (screenWidth >= 1200)? 'EVENTS' : '';
            (screenWidth >= 1200)? changeArrowDown('EVENTS', '#fff') : '';
          }"
          @mouseover="() => {
            dropDownNav = (screenWidth >= 1200)? 'EVENTS' : '';
            (screenWidth >= 1200)? changeArrowDown('EVENTS', '#fff') : '';
          }"
          @mouseleave="($event: Event) => { 
            dropDownNav = (closeOrStillOpenDropdown($event, ['events']) && (screenWidth >= 1200))? 'EVENTS' : '';
            (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
          }" 
          class="d-block underline-none" 
          :style="(screenWidth >= 1200)? changeDropDownBGColor('EVENTS')+'padding:6px 0;' : 'padding:10px 0;background-color:#ebe9eb;'"
          :class="(screenWidth >= 1200)? ['nav-link', 'border-tr-tl-radius-15-px', 'cursor-pointer'] : ''"
        >
          <div :style="(screenWidth >= 1200)? 'padding-left:10px;padding-right:10px;' : 'padding-left:5px;'" class="flex-box flex-direction-row justify-content-space-between align-items-center flex-nowrap">
            <div :style="!(screenWidth >= 1200)? 'font-weight: bold' : ''">
              {{ (screenWidth >= 1200)? 'Events' : 'EVENTS' }}
            </div>
            <template v-if="(screenWidth >= 1200)">
              <div>
                <ArrowDown />
              </div>
            </template>
          </div>
        </a>
        <div class="position-relative d-block">
          <template v-if="(screenWidth >= 1200)">
            <template v-if="dropDownNav === 'EVENTS'">
              <div 
                style="width:170px;" 
                @mouseleave="($event: Event) => {
                  dropDownNav = closeOrStillOpenDropdown($event, ['events-link'])? 'EVENTS' : '';
                  (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                }" 
                id="events" 
                class="position-absolute"
              >
                <div class="d-block drop-down">
                  <ul style="font-size:0px;" class="flex-w-100-percentage flex-box flex-direction-column justify-content-start align-items-center flex-nowrap list-style-none m-0 p-0">
                    <li style="font-size:15px;" class="w-100 border-black">
                      <RouterLink 
                        to="/events/upcoming" 
                        style="padding:8px 5px;" 
                        class="d-block underline-none cursor-pointer" 
                        @blur="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                        @focus="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                        @mouseover="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                      >
                        Upcoming Events
                      </RouterLink>
                    </li>
                    <li style="font-size:15px;" class="w-100 border-black-no-top">
                      <RouterLink 
                        to="/events/past" 
                        style="padding:8px 5px;" 
                        class="d-block underline-none cursor-pointer" 
                        @blur="() => {
                          dropDownNav = '';
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                        @focus="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                        @mouseover="() => {
                          (screenWidth >= 1200)? (dropDownNav === 'EVENTS'? changeArrowDown('EVENTS', '#fff') : changeArrowDown('EVENTS', '#00000')) : '';
                        }"
                      >
                        Past Events
                      </RouterLink>
                    </li>
                  </ul>
                </div>
              </div>
            </template>
          </template>
          <template v-else>
            <div class="d-block drop-down">
              <ul style="font-size:0px;" class="flex-w-100-percentage flex-box flex-direction-column justify-content-start align-items-center flex-nowrap list-style-none m-0 p-0">
                <li style="font-size:15px;" class="w-100 border-black">
                  <RouterLink to="/events/upcoming" style="padding:8px 5px;" class="d-block underline-none cursor-pointer">Upcoming Events</RouterLink>
                </li>
                <li style="font-size:15px;" class="w-100 border-black-no-top">
                  <RouterLink to="/events/past" style="padding:8px 5px;" class="d-block underline-none cursor-pointer">Past Events</RouterLink>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Publications -->
        <RouterLink 
          to="/publications"
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          Publications
        </RouterLink>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Public Survey -->
        <RouterLink 
          to="/survey"  
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          Public Survey
        </RouterLink>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- About Us -->
        <RouterLink 
          to="/about" 
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          About Us
        </RouterLink>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Our Vision -->
        <RouterLink  
          to="/vision" 
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          Our Vision
        </RouterLink>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Our Team -->
        <RouterLink 
          to="/team" 
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          Our Team
        </RouterLink>
      </li>
      <li 
        :class="(screenWidth >= 1200)? ['border-tr-tl-radius-15-px', 'text-center', 'border-black'] : ['text-left', 'w-100', 'border-black-no-top']" 
        class="align-self-stretch w-12-dot-5-percent" 
        style="font-size: 0.875rem;"
      >
        <!-- Contact Us -->
        <RouterLink 
          to="/contact" 
          :style="(screenWidth >= 1200)? 'padding:6px 0;' : 'padding: 10px 0px 10px 5px;'" 
          class="d-block underline-none cursor-pointer nav-link"
          :class="(screenWidth >= 1200)? 'border-tr-tl-radius-15-px' : ''"
        >
          Contact Us
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.w-12-dot-5-percent {
  width: 12.5%;
}
.border-black {
  border: 1px solid black;
}
.border-black-no-top {
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.border-tr-tl-radius-15-px {
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
.drop-down a {
  color: #fff;
  letter-spacing: 1.68px;
}
.drop-down {
  background-color: #2ea2cc;
}
.drop-down a:hover {
  background-color: #ffba00;
}
.nav-link {
  background-color: #fff;
  color: blue;
  letter-spacing: 1.68px;
}
.nav-link:hover {
  background-color: #ffba00;
  color: #fff;
}
</style>