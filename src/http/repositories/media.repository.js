import BaseRepository from "./base.repository.js";
import Media from "../models/media.model.js";

class MediaRepository extends BaseRepository{
    constructor(){
        super(Media);
    }
}

export default MediaRepository;