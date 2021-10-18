<template>
    <div class="auth-background">
        <a-row
            type="flex"
            justify="center"
            align="middle"
            :style="{ height: '100%' }"
        >
            <a-col :lg="6">
                <slot />
            </a-col>
        </a-row>
    </div>
</template>
