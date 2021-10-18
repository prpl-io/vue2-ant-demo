<template>
    <div class="loader-layout">
        <a-spin size="large" />
        <slot v-if="$route.path === '/logout'" />
    </div>
</template>
