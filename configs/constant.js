export const USERS = {
    gender: {
        male: 1,
        female: 2,
    },
    is_confirm: {
        true: 1,
        false: 2,
    },
    level: {
        admin: 1,
        user:2,
        shop: 3,
    }
}
export const PAGINATE_OPTIONS = {
    limit: 10,
    page: 1,
}

export const STORE_PATH = {
    uploadFileAvatarUser: "storage/user/avatar",
    uploadFileThumbnailProductCategory: "storage/product_category/thumbnail",
    uploadFileAvatarProductBrand: "storage/product_brand/thumbnail"
}

export const MEDIA = {
    type: {
        product_thumbnail_category: 1,
        product_image_detail: 2,
        product_thumbnail_background: 3,
        product_avatar_user: 4,
        product_thumbnail_brand: 5,
    }
}

export const URL_PATH = {
    avatarUser: "user/avatar/",
    thumbnailProductCategory: "product_category/thumbnail/",
    thumbnailProductBrand: "product_brand/thumbnail/"
}

export const USERADDRESS_TYPE= {
    home: 1,
    office: 2,
}
