import { Transaction } from "sequelize";
import { User } from "../models/User";

export const getUserByAddress = async (address: string, include?: string[]) => {
    const user = await User.findByPk(address, { include });
    if (user == null) {
        throw Error("User not found");
    }
    return user.toJSON();
}

export const updateUser = async (
    address: string,
    request: Partial<User>,
    transaction?: Transaction | null
) => {
    await User.update(
        {
            cash1: request.cash1,
            cash2: request.cash2,
            cash3: request.cash3
        },
        { where: { address }, transaction },
    )
    return true;
}
