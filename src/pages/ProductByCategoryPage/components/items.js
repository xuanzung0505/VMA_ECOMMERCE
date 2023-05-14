const items = [
    {
        id: 'productId',
        title: '[Mã ELLAP4 giảm 400K] Laptop MSI GF63 Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/Thin 11SC-664VN/',
        unitPrice: 180000,
        quantity: 300,
        logo: "https://res.cloudinary.com/dolrhob6r/image/upload/v1682613188/iepdadt09jxov9odacwa.jpg",
        imgPath: [
            "path1",
            "path2",
        ],
        categoryId: 'categoryId',
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
            name: 'Official Store',
            location: "Hà Nội"
        },
        // totalRating: 100,

        rating: 5,
    }
]

let size = 100;

for (let i = 0; i < size - 1; i++) items.push(items[0])

export { items }