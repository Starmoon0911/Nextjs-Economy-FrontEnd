const contactInfo = {
    email: 'support@example.com',
    phone: '+123456789',
};

const links = [
    {
        title: '相關連結',
        items: [
            { label: '隱私政策', url: '/privacy-policy' },
            { label: '使用條款', url: '/terms-of-service' },
        ],
    },
    {
        title: '社交媒體',
        items: [
            { label: 'Facebook', url: 'https://facebook.com' },
            { label: 'Twitter', url: 'https://twitter.com' },
            { label: 'Instagram', url: 'https://instagram.com' },
        ],
    },
];

const support = {
    title: '支援',
    items: [
        { label: '常見問題', url: '/faq' },
        { label: '聯繫我們', url: '/contact' },
    ],
};

export { links, support, contactInfo    }