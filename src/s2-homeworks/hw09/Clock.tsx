import React, {useEffect, useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'
import superEditableSpan from "../hw06/common/c4-SuperEditableSpan/SuperEditableSpan";

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)
    const [isRunning, setIsRunning] = useState<boolean>(false)


    const start = () => {
        stop()
        const id: number = +setInterval(() => {
            setDate(new Date());
        }, 1000);
        setTimerId(id)
        setIsRunning(true)
    }

    const stop = () => {
        clearInterval(timerId)
        setIsRunning(false)
    }


    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }

    const getTwoNumber = (num: number) => num < 10 ? '0' + num : num
    const hours = getTwoNumber(date.getHours())
    const minutes = getTwoNumber(date.getMinutes())
    const seconds = getTwoNumber(date.getSeconds())

    const getDataTime = (dataTime: number) => dataTime < 10 ? '0' + dataTime : dataTime
    const day = getDataTime(date.getDate())
    const month = getDataTime(date.getMonth() + 1)
    const year = getDataTime(date.getFullYear())

    const stringTime = hours + ':' + minutes + ':' + seconds// часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты

    const stringDate = day + '.' + month + '.' + year// день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = new Intl.DateTimeFormat("en-GB", {weekday: "long"}).format(date)// пишут студенты
    const stringMonth = new Intl.DateTimeFormat("en-GB", {month: "long"}).format(date) // пишут студенты


    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={isRunning} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!isRunning} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
