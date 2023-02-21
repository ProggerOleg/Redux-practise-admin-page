import { v4 as uuidv4 } from 'uuid';
import {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { heroesFetching, heroesFetched, filtersFetched } from '../../actions';
import { useHttp } from '../../hooks/http.hook';

const HeroesAddForm = () => {
    const [name, setName] = useState('');
    const [description, setDesc] = useState('');
    const [element, setElement] = useState('');

    const {heroes} = useSelector(state => state.heroes);
    const {filters, statusFilters} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    const createNewChar = (e) => {
        e.preventDefault()
        let newHero = {
            id: uuidv4(),
            name: name,
            description: description,
            element: element
        }
        let data = [...heroes, newHero]
        dispatch(heroesFetching());
        request(`http://localhost:3001/heroes`, 'POST', JSON.stringify(newHero))
        .then(dispatch(heroesFetched(data)))
        .catch(err => console.log(err));

        // Очищаем форму после отправки
        setName('');
        setDesc('');
        setElement('');
    }

    useEffect(() => {
        request(`http://localhost:3001/filters`, 'GET')
        .then(data => dispatch(filtersFetched((data))))
        .catch(err => console.log(err));
        // eslint-disable-next-line
    }, [])

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        // Если фильтры есть, то рендерим их
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // Один из фильтров нам тут не нужен
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }
    const elements = statusFilters==='idle' ? renderFilters(filters) : <option value={'Загрузка фильтров'}/>

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={createNewChar}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control"
                    value={name}
                    onChange={(e)=>setName(e.target.value)} 
                    id="name" 
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    value={description}
                    onChange={(e)=>setDesc(e.target.value)} 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e)=>setElement(e.target.value)}>

                    <option >Я владею элементом...</option> 
                    {elements}

                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;