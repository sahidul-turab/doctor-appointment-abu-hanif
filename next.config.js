/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/book',
                destination: '/#booking',
                permanent: true,
            },
            {
                source: '/advanced',
                destination: '/#booking',
                permanent: true,
            },
            {
                source: '/login',
                destination: '/',
                permanent: true,
            },
            {
                source: '/dashboard',
                destination: '/',
                permanent: true,
            },
            {
                source: '/doctor',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
