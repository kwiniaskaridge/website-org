
<template>
    <main v-if="$page.frontmatter.home" class="home-layout">
      <Navbar
        v-if="shouldShowNavbar"
        @toggle-sidebar="toggleSidebar"
      />
      <div class="column-1">
        <inline-svg class="home-image" :src="data.heroImage"/>
      </div>
      <div class="column-2">
        <h1 class="home-heading">Welcome to<br>{{$site.title}}</h1>
        <h2 class="home-subheading">{{data.tagline}}</h2>
        <p class="home-description">{{data.description}}</p>
      </div>
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
  },
  methods: {
    toggleSidebar (to) {
      this.isSidebarOpen = typeof to === 'boolean' ? to : !this.isSidebarOpen
      this.$emit('toggle-sidebar', this.isSidebarOpen)
    },
  }
}
</script>
