import BaseRepository from "./base.repository.js";
import product_categoryModel from "../models/product_category.model.js";

class ProductCategoryRepository extends BaseRepository{
    constructor(){
        super(product_categoryModel)
    }
}

export default ProductCategoryRepository