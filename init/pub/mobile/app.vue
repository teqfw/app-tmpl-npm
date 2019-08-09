<template>
    <div>
        <span class="name">Mobile realm.</span>
    </div>

</template>

<style>
    .name {
        color: chocolate;
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