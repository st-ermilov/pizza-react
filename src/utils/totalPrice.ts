import {TypePizzaItem} from "../redux/slices/basketSlice";

export const totalPrice = (items: TypePizzaItem[]) => {
    return items.reduce((sum, item) =>
            item.price * item.count + sum
        , 0)
}