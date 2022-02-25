import React from "react";
import './FlatsList.sass';

export const FlatsList = ({ flats }) => {
    if (!flats.length) {
        return <p className="center">Квартир пока нет</p>
    }

    return (
        <>
        { flats.map((flat) => {
            return (
                <ul>
                    <li key={flat._id} className="flatItem">
                        <div className="flatPlan">
                            <img src="http://indizajn.ru/wp-content/uploads/2017/09/Planirovka-kvartiryi-8.jpg" />
                        </div>
                        <div className="flatInfo">
                            <h5>{flat.room}-комнатная квартира, {flat.area}м2</h5>  
                            <p>{flat.description}</p>      
                            <p>Опубликовано: {new Date(flat.date).toLocaleDateString()}</p>
                        </div>          
                        <div className="flatPrice">
                            <h4>{flat.price}$</h4>
                            <br/><br/>
                            <button>в Избранное</button>
                            <button>к Сравнению</button>
                        </div>                                                                                  
                    </li>
                </ul>                
            )           
        })} 
        </>                
    )
}