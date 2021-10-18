<template>
    <div class="auth-background">
        <a-row
            type="flex"
            justify="center"
            align="middle"
            :style="{ height: '100%' }"
        >
            <a-col :xs="20" :sm="16" :md="12" :lg="10" :xl="8">
                <slot />
            </a-col>
        </a-row>
    </div>
</template>
