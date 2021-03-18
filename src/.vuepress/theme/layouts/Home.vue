
<template>
    <main v-if="$page.frontmatter.home" class="
      auto-rows-max
      grid 
      h-screen
      grid-flow-row
      place-content-center
    ">
      <Navbar
        v-if="shouldShowNavbar"
        @toggle-sidebar="toggleSidebar"
      />
      <inline-svg :src="data.heroImage"/>

      <h1 class="
      mx-auto
      mb-5
      dark:text-gray-200 
      font-bold
      text-7xl 
      text-gray-800 
      ">{{$site.title}}</h1>

      <h2 class="
      mx-auto mb-4
      dark:text-gray-200 
      text-2xl
      italic
      ">{{data.tagline}}</h2>
      <p class="kwiniaska-description">{{data.description}}</p>
    </main>
</template>

<script>
import InlineSvg from 'vue-inline-svg';
import Navbar from '@parent-theme/components/Navbar';

export default {
  name: 'HomePage',
components: {
        InlineSvg,
        Navbar
    },
  computed: {
    data() {
      return this.$page.frontmatter
    },
    shouldShowNavbar () {
      const { themeConfig } = this.$site
      const { frontmatter } = this.$page
      if (
        frontmatter.navbar === false
        || themeConfig.navbar === false) {
        return false
      }
      return (
        this.$title
        || themeConfig.logo
        || themeConfig.repo
        || themeConfig.nav
        || this.$themeLocaleConfig.nav
      )
    },
    shouldShowSidebar () {
      const { frontmatter } = this.$page
      return (
        !frontmatter.home
        && frontmatter.sidebar !== false
        && this.sidebarItems.length
      )
    }
  }
}
</script>
