import { PAGINATE_OPTIONS } from "../../../configs/constant.js";

class BaseRepository{
    constructor(model){
        this.setModel(model);
    }
    getModel(){
        return this.model;
    }
    setModel(model){
        this.model = model
    }
    findById(id){
        return this.getModel().findOne({
            _id: id,
        })
    }
    store(data,user){
        if(user){
            return this.getModel().create(
                {
                    ...data,
                    created_by: user._id ?? null,
                    updated_by: user._id ?? null,
                }
            )
        }
        return this.getModel().create(data);
    }

    async paginate(
        conditions = {},
        limit = PAGINATE_OPTIONS.limit,
        page = PAGINATE_OPTIONS.page,
    ){
        limit = +limit || PAGINATE_OPTIONS.limit;
        page = +page || PAGINATE_OPTIONS.page;
        const [data, totalData] = await Promise.all([
            this.getModel().find(conditions).skip(limit * (page - 1)).limit(limit),
            this.getModel().countDocuments(conditions),
        ])
        return  responsePaginate(data, totalData, page, limit);
    }

    update(id, data, user){
        if(user){
            this.getModel().findByIdAndUpdate(
                id,
                {
                    ...data,
                    updated_by: update._id ?? null,
                },
                {new: true}
            )
        }
        return this.getModel().findByIdAndUpdate(id, data, {new: true});
    }
    
    delete(id){
        return this.getModel().findByIdAndDelete(id);
    }
}
export default BaseRepository;