import MediaRepository from "../repositories/media.repository.js";

class MediaService{
    constructor(){
        this.mediaRepository = new MediaRepository();
    }
    async store(data, user = null){
        try {   
            return await this.mediaRepository.store(data, user)
        } catch (error) {
            throw error
        }
    }

    async update(id, data, user = null){
        try {
            return await this.mediaRepository.update(id, data, user);
        } catch (error) {
            throw error
        }
    }
}

export default MediaService;