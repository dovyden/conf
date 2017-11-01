import React, {Component} from 'react';
import DocumentView from '../../components/Document/Document';


export default class Document extends Component {
    // Принял this.props.idDocument, this.props.idVersionDocument, this.props.idActiveTask
    // 1) Проверить есть ли данные документа в store
    // если нет загрузить данные документа с backend'а
    // по idDocument и idVersionDocument определяем url документа и заметки
    // по idActiveTask определяем zoom и координаты сдвига документа относительно центра
    render() {
        return (
            <DocumentView
                idDocument = {this.props.idDocument}
            />
        );
    }
}
