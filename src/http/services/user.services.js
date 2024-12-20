import { generateConfirmEmailUrl } from "../../../common/helper.js";
import UserRepository from "../repositories/user.repository.js"
import EmailService from "./email.services.js";

class UserService{
    constructor(){
        this.userRepository = new UserRepository();
        this.emailService = new EmailService();
    }
    async store(data, user = null){
        try {   
            const newUser = await this.userRepository.store(data, user);
            this.emailService.sendMail(
                [data.email],
                "Confirm account",
                "email/confirmAccount.ejs",
                {
                    name: data.name,
                    confirmUrl: generateConfirmEmailUrl(newUser._id)
                }
            )

            return await newUser.populate('avatar');
        } catch (error) {
            throw error
        }
    }

    async update(id, data, user = null){
        try {
            return await this.userRepository.update(id, data, user);
        } catch (error) {
            throw error
        }
    }

    async show( id){
        try {
            return await this.userRepository.findById(id).populate([
                'addresses',
                'avatar'
            ]);
        } catch (error) {
            throw error
        }
    }

    async delete( id ){
        try {
            return await this.userRepository.delete(id);
        } catch (error) {
            throw error
        }
    }

    async index(keyword, gender, page, limit){
        try {
            const conditions = {};
            if (keyword) {
                conditions.$or = [
                    { name: new RegExp(`${keyword}`, 'i') },
                    { email: new RegExp(`${keyword}`, 'i') },
                    { phone: new RegExp(`${keyword}`, 'i') },
                ]
            };

            if (gender) {
                conditions.gender = gender;
            }

            return await this.userRepository.paginate(conditions, limit, page, [
                'addresses',
                'avatar'
            ]);
        } catch (error) {            
            throw error;
        }
    }
}

export default UserService;