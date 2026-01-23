import { HTTP_STATUS, USER_MESSAGE } from "@org/shared";
import { IUserRepository } from "./interfaces/user.interface";
import { UpdateUserValidatorType } from "./user.validator";

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
}