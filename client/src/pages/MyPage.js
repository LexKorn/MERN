import React, { useEffect, useState, useCallback } from "react";
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import { FlatsList } from '../components/FlatsList';

export const MyPage = () => {
    const [flats, setFlats] = useState([]);
    const {loading, request} = useHttp();
    const [form, setForm] = useState({
        room: '', 
        area: '', 
        price: '', 
        description: ''
    });

    const fetchFlats = useCallback(async () => {
        try {
            const fetched = await request('/api/flats', 'GET', null);
            setFlats(fetched);

        } catch(err) {}
    }, []);

    useEffect(() => {
        fetchFlats();
    }, [fetchFlats]);

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value});
    }

    const flatHandler = async event => {
        // event.preventDefault();
        try {
            const data = await request('/api/flats/record', 'POST', {...form});
            console.log(data);         
        } catch(err) {}        
    }

    if (loading) {
        return <Loader />
    }


    return (
        <>
            <div className="row" style={{marginTop: 50}}>
                <form class="col s12">
                    <div className="row">
                        <div className="input-field col s1">
                        <input 
                            placeholder="1" 
                            id="room" 
                            type="number" 
                            name='room'
                            className="validate"
                            value={form.room}
                            onChange={changeHandler}  
                        />
                        <label htmlFor="room">Комнаты</label>
                        </div>

                        <div className="input-field col s1">
                        <input 
                            placeholder="S" 
                            id="area" 
                            type="number" 
                            name='area'
                            className="validate"
                            value={form.area}
                            onChange={changeHandler}  
                        />
                        <label htmlFor="area">Площадь</label>
                        </div>

                        <div className="input-field col s2">
                        <input 
                            placeholder="$" 
                            id="price" 
                            type="number" 
                            name='price'
                            className="validate"
                            value={form.price}
                            onChange={changeHandler}                        
                        />
                        <label htmlFor="price">Цена</label>
                        </div>

                        <div className="input-field col s7">
                        <input 
                            placeholder="Описание" 
                            id="description" 
                            type="text" 
                            name='description'
                            className="validate"
                            value={form.description}
                            onChange={changeHandler}  
                        />
                        <label htmlFor="description">Описание</label>
                        </div>
                    </div>

                    <div className="card-action">
                        <button 
                            className='btn yellow darken-4' 
                            style={{marginRight: 10}}  
                            onClick={flatHandler}
                        >  
                                Отправить
                        </button>                              
                    </div>
                </form>
            </div>

            { !loading && <FlatsList flats={flats} /> }
        </>        
    );
}