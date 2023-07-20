const commonNavData = [
    {
        path: '/',
        title: 'Home',
    },
    {
        path: '/about',
        title: 'About',
    },
    {
        path: '/blogs',
        title: 'Blogs',
    },
    {
        path: '/products',
        title: 'Products',
    }
];

export const afterLoginNavData = [ ...commonNavData,
    {
        path: '/dashboard',
        title: 'Dashboard'
    },
    {
        path: '/profile',
        title: 'Profile'
    }
];

export const beforeLoginNavData = [ ...commonNavData,
    {
        path: '/login',
        title: 'Login'
    },
    {
        path: '/signup',
        title: 'Signup'
    },
];