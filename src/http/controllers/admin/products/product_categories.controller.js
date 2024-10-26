import { responseError, responseJson, responseSuccess } from "../../../../../common/helper.js";
import MediaService from "../../../services/media.services.js";
import { MEDIA } from "../../../../../configs/constant.js";
import ProductCategoryService from "../../../services/product_category.service.js";
import { PAGINATE_OPTIONS } from "../../../../../configs/constant.js";

class ProductCategoryController {
    static mediaService = new MediaService;
    static productCategory = new ProductCategoryService
    async store(req, res) {
        try {
            let data = { ...req.body, thumbnail_id: null };
            if (req.file) {
                const media = await ProductCategoryController.mediaService.store(
                    {
                        url: req.file.filename,
                        type: MEDIA.type.product_thumnail_catory,
                    }
                )
                data.thumbnail_id = media._id;
            }
            const productCategory = await ProductCategoryController.productCategory.store({...data})

            return responseJson(
                res,
                responseSuccess(
                    productCategory
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(
                    error
                )
            )
        }

    }

    async update(req, res){
        try {
            const categoryId = req.params.categoriesId;
            let data = {...req.body};
            if (req.file) {
                const media = await ProductCategoryController.mediaService.store({
                    url: req.file.filename,
                    type: MEDIA.type.product_thumnail_catory,
                });  
                data.thumbnail_id = media._id;
            }
            const updatedCategory = await ProductCategoryController.productCategory.update(categoryId, data);
    
            return responseJson(
                res,
                responseSuccess(updatedCategory)
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            )
        }
    }

    async index(req, res){
        try {
            const {
                name,
                gender,
                limit = PAGINATE_OPTIONS.limit,
                page = PAGINATE_OPTIONS.page,
            } = req.query;
            const categories = await ProductCategoryController.productCategory.index(name, gender, page, limit);

            return responseJson(
                res,
                responseSuccess(
                    categories
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(
                    error
                )
            )
        }
    }

    async delete(req, res){
        try {
            const categoryId= req.params.categories_id;
            const category =  await ProductCategoryController.productCategory.delete(categoryId);

            return responseJson(
                res,
                responseSuccess(
                   category
                )
            )
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            )
        }
    }

    async show(req, res){
        try {
            const categoryId= req.params.categories_id;
            
            return responseJson(
                res,
                responseSuccess(
                    await ProductCategoryController.productCategory.show(categoryId)
                )
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error),
            );
        }
    }
}
export default ProductCategoryController;