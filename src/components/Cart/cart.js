const cartItems = [
    {
        _id: 'cartItemId1',
        varianceId: 'varianceId',
        variance: {
            _id: 'varianceId',
            attribute: [
                { "title": "Màu sắc", "value": "XÁM" },
                { "title": "Kích cỡ", "value": "L" }
            ],
            unitPrice: 169000,
            quantity: 170,
            productId: 'productId',
            product: {
                id: 'productId',
                title: '[Mã ELLAP4 giảm 400K] Laptop MSI GF63 Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/',
                unitPrice: 180000,
                quantity: 300,
                logo: "https://res.cloudinary.com/dolrhob6r/image/upload/v1681896394/hhdo1azkombpdgp2fzgd.jpg",
                imgPath: [
                    "path1",
                    "path2",
                ],
                category: {
                    id: "categoryId",
                    title: "Category title",
                    parent: {
                        id: "categoryId",
                        title: "Category title parent 1",
                        parent: {
                            id: "categoryId",
                            title: "Category title parent 2",
                            parent: {
                            }
                        }
                    }
                },
                detail: [
                    { "Thương hiệu": "A" },
                    {
                        "Phong cách": ["Thể thao", "Cơ bản", "Đường phố"]
                    },
                    {
                        "Xuất xứ": "Việt Nam"
                    }
                ],
                vendorId: 'vendorId',
                vendor: {
                    id: 'vendorId',
                    name: 'Official Store'
                }
            },
        },
        quantity: 2,
    },

    {
        _id: 'cartItemId2',
        varianceId: 'varianceId2',
        variance: {
            _id: 'varianceId2',
            attribute: [
                { "title": "Màu sắc", "value": "XÁM" },
                { "title": "Kích cỡ", "value": "L" }
            ],
            unitPrice: 169000,
            quantity: 170,
            productId: 'productId',
            product: {
                id: 'productId',
                title: '[Mã ELLAP4 giảm 400K] Laptop MSI GF63 Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/',
                unitPrice: 180000,
                quantity: 300,
                logo: "https://res.cloudinary.com/dolrhob6r/image/upload/v1681896394/hhdo1azkombpdgp2fzgd.jpg",
                imgPath: [
                    "path1",
                    "path2",
                ],
                category: {
                    id: "categoryId",
                    title: "Category title",
                    parent: {
                        id: "categoryId",
                        title: "Category title parent 1",
                        parent: {
                            id: "categoryId",
                            title: "Category title parent 2",
                            parent: {
                            }
                        }
                    }
                },
                detail: [
                    { "Thương hiệu": "A" },
                    {
                        "Phong cách": ["Thể thao", "Cơ bản", "Đường phố"]
                    },
                    {
                        "Xuất xứ": "Việt Nam"
                    }
                ],
                vendorId: 'vendorId',
                vendor: {
                    id: 'vendorId',
                    name: 'Official Store'
                }
            },
        },
        quantity: 2,
    },

    {
        _id: 'cartItemId3',
        varianceId: 'varianceId3',
        variance: {
            _id: 'varianceId',
            attribute: [
                { "title": "Màu sắc", "value": "XÁM" },
                { "title": "Kích cỡ", "value": "L" }
            ],
            unitPrice: 169000,
            quantity: 170,
            productId: 'productId',
            product: {
                id: 'productId',
                title: '[Mã ELLAP4 giảm 400K] Laptop MSI GF63 Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/',
                unitPrice: 180000,
                quantity: 300,
                logo: "https://res.cloudinary.com/dolrhob6r/image/upload/v1681896394/hhdo1azkombpdgp2fzgd.jpg",
                imgPath: [
                    "path1",
                    "path2",
                ],
                category: {
                    id: "categoryId",
                    title: "Category title",
                    parent: {
                        id: "categoryId",
                        title: "Category title parent 1",
                        parent: {
                            id: "categoryId",
                            title: "Category title parent 2",
                            parent: {
                            }
                        }
                    }
                },
                detail: [
                    { "Thương hiệu": "A" },
                    {
                        "Phong cách": ["Thể thao", "Cơ bản", "Đường phố"]
                    },
                    {
                        "Xuất xứ": "Việt Nam"
                    }
                ],
                vendorId: 'vendorId2',
                vendor: {
                    id: 'vendorId2',
                    name: 'Official Store 2'
                }
            },
        },
        quantity: 2,
    },
]

export { cartItems }