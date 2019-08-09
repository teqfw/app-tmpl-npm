<template>
    <div>
        <span class="name">Desktop realm.</span>
    </div>

</template>

<style>
    .name {
        color: chartreuse;
    }
</style>

<script>
    define(["Vue"], function (Vue, logger) {
        // const Vue = window.Vue;
        Vue.component("app-main", {
            template: template
        });
    });
</script>