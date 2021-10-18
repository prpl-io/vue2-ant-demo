import startCase from 'lodash/startCase';
import store from '@/state/store';

const routes = [
    { name: 'account', add: false, edit: false },
    { name: 'users', adminOnly: true },
    'tasks'
];

const defaultOptions = {
    index: true,
    add: true,
    edit: true,
    adminOnly: false
};

const crudRoutes = routes.flatMap(route => {
    const property = route.name || route;
    const adminOnly = !!route?.adminOnly;

    const title = startCase(property);

    const indexRoute = {
        path: `/${property}`,
        name: property,
        component: () => import(`@/views/${property}/Index`),
        meta: {
            title,
            authRequired: true,
            adminOnly
        }
    };
    const addRoute = {
        path: `/${property}/add`,
        name: `${property}Add`,
        component: () => import(`@/views/${property}/Single`),
        meta: {
            title: `${title} Management`,
            authRequired: true,
            adminOnly
        }
    };
    const editRoute = {
        path: `/${property}/:id/edit`,
        name: `${property}Edit`,
        component: () => import(`@/views/${property}/Single`),
        meta: {
            title: `${title} Management`,
            authRequired: true,
            adminOnly
        }
    };

    if (typeof route === 'string') {
        return [indexRoute, addRoute, editRoute];
    }

    const { index, add, edit } = { ...defaultOptions, ...route };
    const routes = [];

    if (index) {
        routes.push(indexRoute);
    }

    if (add) {
        routes.push(addRoute);
    }

    if (edit) {
        routes.push(editRoute);
    }

    return routes;
});

export default [
    ...crudRoutes,

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/auth/Login'),
        meta: {
            title: 'Login',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/sign-up',
        name: 'sign-up',
        component: () => import('@/views/auth/SignUp'),
        meta: {
            title: 'Sign up',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/set-password/:token',
        name: 'setPassword',
        component: () => import('@/views/auth/ResetPassword'),
        meta: {
            title: 'Set password',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/reset-password/:token',
        name: 'resetPassword',
        component: () => import('@/views/auth/ResetPassword'),
        meta: {
            title: 'Reset password',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/forget-password',
        name: 'forgetPassword',
        component: () => import('@/views/auth/ForgetPassword'),
        meta: {
            title: 'Forget password',
            guestOnly: true,
            layout: 'auth'
        }
    },
    {
        path: '/logout',
        name: 'logout',
        component: () => import('@/views/logout/Index'),
        meta: {
            title: 'Logout',
            layout: 'loader',
            authRequired: true
        }
    },

    {
        path: '/',
        name: 'dashboard',
        component: () => import('@/views/dashboard/Index'),
        meta: {
            title: 'Dashboard',
            authRequired: true
        }
    },

    {
        path: '*',
        name: 'notFoundPage',
        component: () => import('@/layouts/error'),
        meta: {
            title: 'Not found page',
            layout: (() =>
                store.getters['auth/loggedIn'] ? 'default' : 'auth')()
        }
    }
];
