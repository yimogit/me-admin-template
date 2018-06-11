<template>
    <dl>
        <template v-for="(item,index) in menus">
            <dt :key="item.menuName">
                <a href="javascript:;" v-if="item.menuUrl" @click="$ui.redirect(item.menuUrl)">{{item.menuName}}</a>
                <router-link :to="{name:item.menuCode}" v-else-if="item.menuCode">{{item.menuName}}</router-link>
                <span v-else>{{item.menuName}}</span>
            </dt>
            <dd class="child-menu" :key="'c_'+index" v-if="item.children&&item.children.length>0">
                <v-app-nav :menus="item.children" />
            </dd>
        </template>
    </dl>
</template>

<script>
export default {
  name: 'v-app-nav',
  props: ['menus']
}
</script>

<style>
</style>
