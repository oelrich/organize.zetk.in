import React from 'react/addons';
import moment from 'moment';

import PaneBase from './PaneBase';
import ActionList from '../misc/actionlist/ActionList';


export default class EditActionPane extends PaneBase {
    componentDidMount() {
        this.listenTo('action', this.forceUpdate);
    }

    getPaneTitle(data) {
        const d = moment(this.getParam(0));

        return 'Actions on ' + d.format('YYYY-MM-DD');
    }

    renderPaneContent(data) {
        const date = moment(this.getParam(0));
        const actionStore = this.getStore('action');
        const actions = actionStore.getActions().filter(a =>
            moment(a.start_time).isSame(date, 'day'));

        return [
            <input key="prevBtn" type="button" value="<"
                onClick={ this.onClickPrev.bind(this) }/>,
            <input key="nextBtn" type="button" value=">"
                onClick={ this.onClickNext.bind(this) }/>,
            <ActionList key="actionList" actions={ actions }
                onActionOperation={ this.onActionOperation.bind(this) }/>
        ];
    }

    onClickPrev() {
        const curDate = Date.create(this.getParam(0));
        const newDate = curDate.rewind({ days: 1 });
        const dateStr = newDate.format('{yyyy}-{MM}-{dd}');

        this.gotoPane('actionday', dateStr);
    }

    onClickNext() {
        const curDate = Date.create(this.getParam(0));
        const newDate = curDate.advance({ days: 1 });
        const dateStr = newDate.format('{yyyy}-{MM}-{dd}');

        this.gotoPane('actionday', dateStr);
    }

    onActionOperation(action, operation) {
        if (operation == 'edit') {
            this.gotoSubPane('editaction', action.id);
        }
    }
}