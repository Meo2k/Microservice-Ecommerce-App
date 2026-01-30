
import { Request, Response } from "express";
import { GetShopDetailsCommand, GetShopDetailsUseCase } from "../application/use-case/get-shop-details.use-case.js";
import { HTTP_STATUS } from "@org/shared";
import { ShopErrors } from "../domain/errors/shop.errors.js";

export class ShopController {
    constructor(private readonly getShopDetailsUseCase: GetShopDetailsUseCase) { }

    getShopDetails = async (req: Request, res: Response) => {
        const { shopId } = req.params;

        const result = await this.getShopDetailsUseCase.execute(new GetShopDetailsCommand(shopId));

        if (!result.isSuccess) {

            const statusCode = result.error.code === ShopErrors.NotFound.code
                ? HTTP_STATUS.NOT_FOUND
                : HTTP_STATUS.BAD_REQUEST;

            return res.status(statusCode).json({
                success: false,
                error: result.error
            });
        }

        // Thành công
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            data: result.value
        });
    }
}

