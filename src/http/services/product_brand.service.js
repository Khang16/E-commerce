import ProductBrandRepository from "../repositories/product_brand.js";

class ProductBrandService {
    constructor() {
        this.productBrandRepository = new ProductBrandRepository();
    };

    async store(data) {
        try {
            const productBrand = await this.productBrandRepository.store(data);

            return await productBrand.populate('thumbnail');
        } catch (error) {
            throw error;
        };
    };

    async update(id, data,) {
        try {
            return await this.productBrandRepository.update(id, data).populate('thumbnail');
        } catch (error) {
            throw error;
        };
    };

    async index(name, limit, page) {
        try {
            const conditions = {};
            if (name) {
                conditions.$or = [
                    { name: new RegExp(`${name}`, 'i') },
                ]
            }

            return await this.productBrandRepository.paginate(conditions, limit, page, [
                'thumbnail'
            ]);
        } catch (error) {
            throw error;
        };
    };

    async show(id) {
        try {
            return await this.productBrandRepository.findById(id);
        } catch (error) {
            throw error;
        };
    };

    async delete(id) {
        try {
            return await this.productBrandRepository.delete(id)
        } catch (error) {
            throw error;
        };
    };
}

export default ProductBrandService;