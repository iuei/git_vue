<template>
  <el-aside class="imgUrl" width="180px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="defaultOpeneds" :router="true">
      <el-submenu v-for="group in menuGroups" :key="group.index" :index="group.index">
        <template #title><i :class="group.icon"></i>{{ group.title }}</template>
        <el-menu-item v-for="item in group.items" :key="item.index" :index="item.index">
          {{ item.text }}
        </el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
import { ElAside, ElMenu, ElMenuItem } from 'element-plus';

export default {
  name: "Navigation",
  components: {
    ElAside,
    ElMenu,
    ElMenuItem,
  },
  data() {
    return {
      defaultOpeneds: ['1', '3'],
      menuGroups: [
        {
          index: "1",
          icon: "el-icon-message",
          title: "导航一",
          items: [
            { index: "1-1", text: "用户信息"},
            { index: "1-2", text: "选项2"},
            { index: "1-3", text: "选项3"},
            { index: "1-4", text: "选项4"},
          ],
        },
        {
          index: "2",
          icon: "el-icon-menu",
          title: "导航二",
          items: [
            { index: "2-1", text: "选项1"},
            { index: "2-2", text: "选项2"},
            { index: "2-3", text: "选项3"},
            { index: "2-4-1", text: "选项4"},
          ],
        },
      ],
    };
  },
};
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 100px;
  min-height: 400px;
}
</style>
