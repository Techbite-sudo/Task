import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "../auth/auth-context";
import { useSnackbar } from "notistack";
import axiosInstance from "../utils/axios";
import { CART_ITEM, ITEM } from "../utils/types";

const AppContext = createContext({
    cart: [] as CART_ITEM[],
    setCart: (_: any) => {},
    manageCart: async (_: ITEM, __: 'Add' | 'Remove') => {}
});

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
}

interface ACP {
    children: ReactNode;
}

const AppContextProvider = ({ children }: ACP) => {

    const { isAuthenticated } = useAuthContext();
    const { enqueueSnackbar } = useSnackbar();

    const [cart, setCart] = useState<CART_ITEM[]>([]);

    const getCartHandler = async () => {
        try {
            const { data } = await axiosInstance.get(`/user/cart`);
            setCart(data?.cart?.items || []);
        } catch (err: any) {
            enqueueSnackbar(err, { variant: 'error' });
        }
    };

    const manageCart = async (product: ITEM, method: 'Add' | 'Remove') => {
        let previousCart = cart
        if (method === 'Add') {
            const foundItemInCart = cart && cart?.length > 0 ? cart?.find((ci) => ci._id === product._id) : undefined;
            if (!foundItemInCart) previousCart = [...cart, { ...product, quantity: 1 }];
            else if (foundItemInCart) previousCart = cart.map(it => {
                if (it._id === product._id) return { ...it, quantity: it.quantity + 1, }
                return it;
            })
        } else if (method === 'Remove') {
            const foundItemInCart = cart && cart?.length > 0 ? cart?.find((ci) => ci._id === product._id) : 0;
            if (foundItemInCart) {
                if (foundItemInCart.quantity === 1) previousCart = cart.filter(c => c._id !== product._id);
                else if (foundItemInCart.quantity > 1) previousCart = cart.map(each => {
                    if (each._id === product._id) return { ...each, quantity: each.quantity - 1, }
                    return each
                })
            }
        };
        setCart(previousCart);
        if (isAuthenticated) {
            try {
                await axiosInstance.patch('/user/manage-cart', { items: previousCart.map(each => ({ _id: each._id, quantity: each.quantity })) });
            } catch (err: any) {
                enqueueSnackbar(err, { variant: 'error' });
            }
        }
    }

    useEffect(() => {
        if (isAuthenticated) {
            getCartHandler()
        }
    }, [isAuthenticated]);

    const value = {
        cart,
        manageCart,
        setCart
    };
    return <AppContext.Provider value={value}>{children}</AppContext.Provider>
};

export default AppContextProvider;