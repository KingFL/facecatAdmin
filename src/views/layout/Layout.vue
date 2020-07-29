<template>
  <div class="app-wrapper" :class="classObj">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <!-- tag标签 -->
        <div class='tabs-view-container'>
          <router-link class="tabs-view" v-for="tag in Array.from(visitedViews)" :to="tag.path" :key="tag.path">
            <el-tag :closable="true" :type="isActive(tag.path)?'success':''" @close='closeViewTabs(tag,$event)'>
              {{tag.name}}
            </el-tag>
          </router-link>
        </div>
      <!-- tag标签 -->
      
      <br>
      <br>
      <app-main style="margin: 0 10px;"></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  watch: {
    $route() {
      // if (this.$route.path !== '/page/StationTerminalManager/TerminalManager' && this.$route.path !== '/page/StationTerminalManager/TemperatureEquipmentData') {
      this.addViewTabs()
      // }
    }
  },
  computed: {
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    visitedViews() {
      return this.$store.state.app.visitedViews.slice(-6)
    }
  },
  methods: {
    generateRoute() {
      if (this.$route.name) {
        return this.$route
      }
      return false
    },
    addViewTabs() {
      const route = this.generateRoute()
      if (!route) {
        return false
      }
      this.$store.dispatch('addVisitedViews', this.generateRoute())
    },
    isActive(path) {
      return path === this.$route.fullPath
    },
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then((views) => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0]
          if (latestView) {
            this.$router.push(latestView.path)
          } else {
            this.$router.push('/')
          }
        }
      })
      $event.preventDefault()
    },
    handleClickOutside() {
      this.$store.dispatch('CloseSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }
  .tabs-view-container {
    display: inline-block;
    background: #fff;
    width: 100%;
    height: 50px;
    vertical-align: top;
    padding-left: 10px;
    padding-top: 10px;
    border-bottom: 1px solid #ddd;
    .tabs-view {
      margin-left: 10px;
      color: #fff;
    }
  }
</style>
