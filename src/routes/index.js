import { HeaderOnly } from '~/Components/Layout';

import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';

//router này k cần login
const publicRoutes = [
    { path: '/', component: Home },
    { path: '/following', component: Following },
    { path: '/profile', component: Profile },
    { path: '/upload', component: Upload, layout: HeaderOnly },
];

//router này phải đăng nhập mới vào được
const privateRoutes = [];

export { publicRoutes, privateRoutes };
