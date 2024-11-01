import { MEDIA } from "../../../../../configs/constant.js";
import MediaService from "../../../services/media.services.js"
import ProductBrandModel from "../../../models/product_brand.model.js";
import { responseJson, responseError, responseSuccess } from "../../../../../common/helper.js";
import { PAGINATE_OPTIONS } from "../../../../../configs/constant.js";
import ProductBrandService from "../../../services/product_brand.service.js";

class ProductBrandController {
    static mediaService = new MediaService;
    static productBrand = new ProductBrandService;
    async store(req, res) {
        try {
            const data = { ...req.body, thumbnail_id: null }

            if (req.file) {
                const media = await ProductBrandController.mediaService.store(
                    {
                        url: req.file.filename,
                        type: MEDIA.type.brand_thumbnail,
                    }
                )
                data.thumbnail_id = media._id;
            }
            const productBrand = await ProductBrandController.productBrand.store({ ...data });

            return responseJson(
                res,
                responseSuccess(
                    productBrand
                )
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(
                    error
                )
            );
        };
    };

    async update(req, res) {
        try {
            const data = { ...req.body };
            const productBrandId = req.params.brand_id;
            if (req.file) {
                const media = await ProductBrandController.mediaService.store({
                    url: req.file.filename,
                    type: MEDIA.type.brand_thumbnail,
                });
                data.thumbnail_id = media._id;
            }
            const productBrand = await ProductBrandController.productBrand.update(productBrandId, { ...data });

            return responseJson(
                res,
                responseSuccess(productBrand)
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            );
        };
    };

    async index(req, res) {
        try {
            const {
                name,
                gender,
                limit = PAGINATE_OPTIONS.limit,
                page = PAGINATE_OPTIONS.page,
            } = req.query;
            const categories = await ProductBrandController.productBrand.index(name, gender, page, limit);

            return responseJson(
                res,
                responseSuccess(
                    categories
                )
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(
                    error
                )
            );
        };
    }

    async show(req, res) {
        try {
            const productBrandId = req.params.brand_id;
            return responseJson(
                res,
                responseSuccess(await ProductBrandController.productBrand.show(productBrandId))
            );

        } catch (error) {
            responseJson(
                res,
                responseError(error)
            );
        };
    };

    async delete(req, res) {
        try {
            const productBrandId = req.params.brand_id;
            return responseJson(
                res,
                responseSuccess( await ProductBrandController.productBrand.delete(productBrandId)),
            );
        } catch (error) {
            return responseJson(
                res,
                responseError(error)
            );
        };
    };
};

export default ProductBrandController