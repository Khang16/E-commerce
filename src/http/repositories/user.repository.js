import BaseRepository from "./base.repository.js";
import User from '../models/user.model.js';
import { USERS } from "../../../configs/constant.js";
class UserRepository extends BaseRepository {
    constructor() {
        super(User);
    }

    async findUserConfirmedAccountByEmail(email) {
        return await this.getModel().findOne(
            {
                email,
                is_confirmed: USERS.is_confirm.true
            }
        )

    }
}
export default UserRepository;