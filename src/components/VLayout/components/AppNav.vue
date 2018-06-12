<template>
    <dl>
        <template v-for="(item,index) in menus">
            <dt :key="item.menuName" :class="{'nav_title':true,'active':currentIds&&currentIds.indexOf(item.menuId)>-1}">
                <a href="javascript:;" v-if="item.menuUrl" @click="$ui.redirect(item.menuUrl)">{{item.menuName}}</a>
                <router-link :to="{name:item.menuCode}" v-else-if="item.menuCode">{{item.menuName}}</router-link>
                <span v-else>{{item.menuName}}</span>
            </dt>
            <dd class="nav_child_menus" :key="'c_'+index" v-if="item.children&&item.children.length>0">
                <v-app-nav :menus="item.children" :currentIds="currentIds" />
            </dd>
        </template>
    </dl>
</template>

<script>
export default {
  name: 'v-app-nav',
  props: ['menus', 'currentIds']
}
</script>
