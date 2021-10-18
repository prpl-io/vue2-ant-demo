<template>
    <div class="auth-background">
        <div class="auth-layout is-error">
            <div class="error-wrapper">
                <a-result
                    status="404"
                    title="404"
                    sub-title="We are not able to find this page."
                >
                    <template #extra>
                        <a-button type="primary">
                            <router-link to="/">
                                Back Home
                            </router-link>
                        </a-button>
                    </template>
                </a-result>
            </div>
        </div>
    </div>
</template>
