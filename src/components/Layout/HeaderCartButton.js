import React, { useContext, useEffect, useState } from "react";
import classes from './HeaderCartButton.module.css';
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";

const HeaderCartButton = props => {
    const [cartIsHighlighted, setCartIsHighLighted] = useState(false)
    const cartCtx = useContext(CartContext);
    const numberOfCartItems = cartCtx.items.reduce((curNumber, item)=>{
        return curNumber + item.amount
    }, 0)
    const btnClasses = `${classes.button} ${cartIsHighlighted ? classes.bump : ''}`
    const { items } = cartCtx;

    useEffect(()=> {
        if (items.length === 0) {
            return; 
        }
        setCartIsHighLighted(true)
        const timer = setTimeout(()=> {
            setCartIsHighLighted(false)
        }, 300);
        return () => {
            clearTimeout(timer)
        }
    }, [items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}><CartIcon/></span>
            <span>Your Cart</span>
            <span className={classes.badge}>{numberOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;