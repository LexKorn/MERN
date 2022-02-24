import React from "react";
import './FlatsList.sass';

export const FlatsList = ({ flats }) => {
    if (!flats.length) {
        return <p className="center">Квартир пока нет</p>
    }

    return (
        <table>
        <thead>
          <tr>
              <th>N</th>
              <th>Количество комнат</th>
              <th>Площадь, м2</th>
              <th>Цена</th>
              <th>Описание</th>
              <th>Дата публикации</th>
          </tr>
        </thead>

        <tbody>
        { flats.map((flat, index) => {
            return (
                <>
                    <tr key={flat._id} className="flatCard">
                        <td>{index + 1}</td>
                        <td className="room">Количество комнат: {flat.room}</td>
                        <td className="area">Площадь: {flat.area}м2</td>
                        <td className="price">Цена: {flat.price}$</td>
                        <td className="description">{flat.description}</td>
                        <td className="date">Дата публикации: {new Date(flat.date).toLocaleDateString()}</td>
                    </tr>
                    <br></br>
                </>                
            )           
        })}          
        </tbody>
      </table>
    )
}