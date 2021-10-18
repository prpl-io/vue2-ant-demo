import axios from 'axios';
import { StatusCodes as HTTP } from 'http-status-codes';
import router from '@/router';
import { apiUrl, publicPath, projectName } from '@/config';

axios.defaults.baseURL = apiUrl;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
    response => response,
    error => {
        const { responseURL } = error.response.request;
        const fromUrl = responseURL.split('/').pop();
        const nonRedirectUrls = ['login', 'otp'];

        const { status } = error.response;

        console.warn('Error status', status);

        if (
            status === HTTP.UNAUTHORIZED &&
            !nonRedirectUrls.includes(fromUrl)
        ) {
            let { pathname } = window.location;

            if (publicPath !== '/' && pathname.startsWith(publicPath)) {
                pathname = pathname.replace(publicPath, '/');
            }

            window.location.href = `${publicPath}login?redirectFrom=${encodeURI(
                pathname
            )}`;

            const keys = Object.keys(localStorage);

            keys.forEach(key => {
                if (key.startsWith(projectName)) {
                    localStorage.removeItem(key);
                }
            });
        } else if (status === HTTP.NOT_FOUND) {
            const {
                app: { $router }
            } = router;

            $router.replace('/page-not-found');
        }

        throw error;
    }
);

for (const method of [
    'request',
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch'
]) {
    axios['$' + method] = function() {
        return this[method].apply(this, arguments).then(res => res && res.data);
    };
}

export default axios;
