import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress/nprogress';
import store from '@/state/store';
import routes from './routes';
import { publicPath as base } from '@/config';

Vue.use(VueRouter);

const router = new VueRouter({
    routes,
    base,
    mode: 'history',
    linkActiveClass: 'active',
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return { x: 0, y: 0 };
        }
    }
});

router.beforeEach(async (routeTo, routeFrom, next) => {
    if (routeFrom.name) {
        NProgress.configure({ showSpinner: false });
        NProgress.start();
    }

    const authRequired = routeTo.matched.some(route => route.meta.authRequired);
    const guestOnly = routeTo.matched.some(route => route.meta.guestOnly);
    const adminOnly = routeTo.matched.some(route => route.meta.adminOnly);

    if (!authRequired && !guestOnly && !adminOnly) {
        return next();
    }

    const { getters, dispatch } = store;
    const loggedIn = getters['auth/loggedIn'];
    const isAdmin = getters['auth/isAdmin'];

    if (adminOnly) {
        if (isAdmin) {
            const validUser = await dispatch('auth/validate');

            return validUser ? next() : redirectToDashboard();
        }

        return redirectToDashboard();
    }

    if (authRequired) {
        if (loggedIn) {
            const validUser = await dispatch('auth/validate');

            return validUser ? next() : redirectToLogin();
        }

        return redirectToLogin();
    }

    if (guestOnly) {
        if (loggedIn) {
            const validUser = await dispatch('auth/validate');

            return validUser ? redirectToDashboard() : next();
        }

        return next();
    }

    function redirectToLogin() {
        next({ name: 'login', query: { redirectFrom: routeTo.fullPath } });
    }

    function redirectToDashboard() {
        next({ name: 'dashboard' });
    }
});

router.beforeResolve(async (routeTo, routeFrom, next) => {
    // Create a `beforeResolve` hook, which fires whenever
    // `beforeRouteEnter` and `beforeRouteUpdate` would. This
    // allows us to ensure data is fetched even when params change,
    // but the resolved route does not. We put it in `meta` to
    // indicate that it's a hook we created, rather than part of
    // Vue Router (yet?).
    try {
        // For each matched route...
        for (const route of routeTo.matched) {
            await new Promise((resolve, reject) => {
                // If a `beforeResolve` hook is defined, call it with
                // the same arguments as the `beforeEnter` hook.
                if (route.meta && route.meta.beforeResolve) {
                    route.meta.beforeResolve(routeTo, routeFrom, (...args) => {
                        // If the user chose to redirect...
                        if (args.length) {
                            // If redirecting to the same route we're coming from...
                            if (routeFrom.name === args[0].name) {
                                // Complete the animation of the route progress bar.
                                NProgress.done();
                            }

                            // Complete the redirect.
                            next(...args);
                            reject(new Error('Redirected'));
                        } else {
                            resolve();
                        }
                    });
                } else {
                    // Otherwise, continue resolving the route.
                    resolve();
                }
            });
        }
        // If a `beforeResolve` hook chose to redirect, just return.
    } catch (error) {
        return;
    }

    // If we reach this point, continue resolving the route.
    next();
});

const DEFAULT_TITLE = 'Vue 2 Demo';

router.afterEach(to => {
    NProgress.done();

    document.title =
        `${to?.meta?.title || ''} | ${DEFAULT_TITLE}` || DEFAULT_TITLE;
});

export default router;
