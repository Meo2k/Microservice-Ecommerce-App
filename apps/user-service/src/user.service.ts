import { ENV, HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "./interfaces/user.interface";
import { UpdateUserAddressValidatorType, UpdateUserValidatorType } from "./user.validator";

export class UserService {
    constructor(private readonly userRepo: IUserRepository) {}

    getAllUser = async () => {
        const users = await this.userRepo.getAllUser()
        const usersDto = users.map(user => this.userRepo.toUserResponseDto(user))
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_ALL_USER.SUCCESS,
                users: usersDto
            },
        }
    }

    updateUser = async (userId: number, data: UpdateUserValidatorType) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND)
        }
        const updatedUser = await this.userRepo.updateUser(userId, data)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.UPDATE_USER.SUCCESS,
                user: this.userRepo.toUserResponseDto(updatedUser)
            },
        }
    }

    getUserById = async (userId: number) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.GET_USER.NOT_FOUND)
        }
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_USER.SUCCESS,
                user: this.userRepo.toUserResponseDto(user)
            },
        }
    }

    deleteUser = async (userId: number) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.DELETE_USER.NOT_FOUND)
        }
        const deletedUser = await this.userRepo.deleteUser(userId)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.DELETE_USER.SUCCESS,
                user: this.userRepo.toUserResponseDto(deletedUser)
            },
        }
    }

    // logic for address of user 
    updateUserAddress = async (userId: number, data: UpdateUserAddressValidatorType) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND)
        }
        const country = await this.userRepo.findCountryById(data.countryId)
        if (!country) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND)
        }
        const city = await this.userRepo.findCityById(data.cityId)
        if (!city) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND)
        }
        const updatedAddress = await this.userRepo.updateUserAddress(data.id!, data)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.UPDATE_ADDRESS.SUCCESS,
                address: updatedAddress
            },
        }
    }

    getUserAddress = async (userId: number) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.GET_USER.NOT_FOUND)
        }
        const address = await this.userRepo.getUserAddress(userId)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.GET_ADDRESS.SUCCESS,
                address: address
            },
        }
    }

    createUserAddress = async (userId: number, data: UpdateUserAddressValidatorType) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND)
        }

        const country = await this.userRepo.findCountryById(data.countryId)
        if (!country) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND)
        }
        const city = await this.userRepo.findCityById(data.cityId)
        if (!city) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.NOT_FOUND)
        }

        const addressArray = await this.userRepo.getUserAddress(userId)
        if (addressArray.length >= Number(ENV.MAX_ADDRESS)) {
            throw new Error(USER_MESSAGE.UPDATE_ADDRESS.MAX_ADDRESS)
        }
        const createdAddress = await this.userRepo.createUserAddress(userId, data)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.CREATE_ADDRESS.SUCCESS,
                address: createdAddress
            },
        }
    }

    deleteUserAddress = async (userId: number) => {
        const user = await this.userRepo.findUserById(userId)
        if (!user) {
            throw new Error(USER_MESSAGE.UPDATE_USER.NOT_FOUND)
        }
        const deletedAddress = await this.userRepo.deleteUserAddress(userId)
        return {
            status: HTTP_STATUS.OK,
            metadata: {
                message: USER_MESSAGE.DELETE_ADDRESS.SUCCESS,
                address: deletedAddress
            },
        }
    }
}