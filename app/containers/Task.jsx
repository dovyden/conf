import React, {Component} from 'react';

class Task extends Component {
    render() {
        return (
            <div className="c-dr-task">
                <div className="l-dr-task__content-left">
                    <div className="l-dr-task__preview c-dr-task__preview"/>
                </div>
                <div className="c-dr-task__content-right">
                    <div className="l-dr-task__header">
                        <div className="c-dr-task__header">
                            <div>
                                <span className="c-dr-task__header-status">Задача в работе</span>
                                <span className="c-dr-task__header-author"> — Васильев</span>
                                <span className="c-dr-task__header-version">В.1/1.1</span>
                            </div>
                            <div>Создана 30 июл. 2017 (21:00) — Константинопольский</div>
                        </div>
                    </div>
                    <div className="l-dr-task__about">
                        <div className="c-dr-task__text">
                            Гетерогенная структура, как неоднократно наблюдалось при постоянном воздействии
                            ультрафиолетового облучения, поглощает коллапсирующий разрыв.
                        </div>
                        <div className="c-dr-task__created">
                            Ред. 1 авг. 2017 (21:12)
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Task;
