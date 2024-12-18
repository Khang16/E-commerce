import BaseRepository from "./base.repository.js";
import ProductBrand from "../models/product_brand.model.js";

class ProductBrandRepository extends BaseRepository {
    constructor() {
        super(ProductBrand)
    }
}

export default ProductBrandRepository