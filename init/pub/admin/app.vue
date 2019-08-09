<template>
    <div>
        <span class="name">Admin realm.</span>
    </div>

</template>

<style>
    .name {
        color: brown;
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