import mediaModel from "../models/media.model.js";
import MediaService from "./media.services.js";
import ProductCategoryRepository from "../repositories/product_category.js";

class ProductCategoryService{
    constructor(){
        this.productCategoryRepository = new ProductCategoryRepository();
    }
    async store(data, productCategory = null){
        try {
            const newProductCategory = await this.productCategoryRepository.store(data, productCategory);
            
            return await newProductCategory.populate('thumbnail')
        } catch (error) {
            throw error
        }
    }

    async update(id, data, category = null){
        try {
            return await this.productCategoryRepository.update(id, data, category).populate('thumbnail');
        } catch (error) {
            throw error
        }
    }

    async index(name, limit, page){
        try {
            const conditions = {};
            if (name) {
                conditions.$or = [
                    { name: new RegExp(`${name}`, 'i') },
                ]
            }

            return await this.productCategoryRepository.paginate(conditions, limit, page, [
                'thumbnail'
            ]);
            
        } catch (error) {                        
            throw error;
        }
    }

    async delete(id){
        try {
            return await this.productCategoryRepository.delete(id);
        } catch (error) {
            throw error
        }
    }

    async show(id){
        try {
            return await this.productCategoryRepository.findById(id).populate("thumbnail");
        } catch (error) {
            throw error
        }
    }
}

export default ProductCategoryService;