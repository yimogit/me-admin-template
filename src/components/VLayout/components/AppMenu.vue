<template>
    <div>
        <template v-for="(item,index) in menus">
            <el-submenu :index="String(item.menuId)" v-if="!!item.children&&item.children.length>0" :key="'p_'+index">
                <template slot="title">
                    <i :class="item.menuIcon"></i>
                    <span slot="title" class="left-menu--text">{{item.menuName}}</span>
                </template>
                <v-app-menu :menus="item.children" />
            </el-submenu>
            <el-menu-item v-else :key="'p_s_'+index" :index="String(item.menuId)" @click="e=>$ui.pages.link(item.menuUrl||{name:item.menuCode})">
                <i :class="item.menuIcon"></i>
                <span slot="title" class="left-menu--text">{{item.menuName}}</span>
            </el-menu-item>
        </template>
    </div>
</template>
<script>
export default {
  name: 'v-app-menu',
  props: ['menus']
}
</script>
