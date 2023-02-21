import { v4 as uuidv4 } from 'uuid';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames';

import Spinner from '../spinner/Spinner';
import { useHttp } from "../../hooks/http.hook";
import { activeFilterChanged, fetchFilters } from "../../actions";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    const {filters, statusFilters, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchFilters(request))
        // eslint-disable-next-line
    }, [])

    if (statusFilters === 'loading') {
        return <Spinner/>
    } else if (statusFilters === 'error') {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderButtons = (arr=[]) => {
        if (arr.length === 0) {
            return <h5 className={"text-center mt-5"}>Фильтры не найдены</h5>
        }

        return arr.map(({name, className, label}) => {
            const btnClass = classNames('btn', className, {
                'active': name === activeFilter
            });

            return <button
                id={name}
                key={uuidv4()}
                className={btnClass}
                onClick={() => dispatch(activeFilterChanged(name))}
                >{label}</button>
        })
    }

    const buttons = renderButtons(filters)

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;