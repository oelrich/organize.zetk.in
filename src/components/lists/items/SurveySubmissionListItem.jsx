import React from 'react';
import cx from 'classnames';

import Avatar from '../../misc/Avatar';
import DraggableAvatar from '../../misc/DraggableAvatar';
import { FormattedMessage as Msg } from 'react-intl';

export default class SurveySubmissionListItem extends React.Component {
    static propTypes = {
        onItemClick: React.PropTypes.func,
        data: React.PropTypes.object,
    }

    render() {
        let submission = this.props.data;
        if (!submission) return null;

        let timestamp = Date.create(submission.submitted);

        let respondentAvatar = null;
        let respondentName = null;
        let actionStatus = null;

        if (submission.respondent) {
            respondentName =
                submission.respondent.first_name
                + ' ' +
                submission.respondent.last_name;

            if (submission.respondent.id) {
                respondentAvatar =
                    <Avatar person={ submission.respondent }/>;
                actionStatus = "linked";
            }
            else {
                respondentAvatar =
                    <div className="SurveySubmissionListItem-unknown"/>;
                actionStatus = "unknown";
            }
        }
        else {
            respondentAvatar =
                <div className="SurveySubmissionListItem-anonymous"/>;
            respondentName = <Msg id="lists.surveySubmissionList.item.anonymous"/>;
        }

        let surveyTitle = '';
        if (submission.survey) {
            surveyTitle = submission.survey.title;
        }

        let actionClassNames  = cx('SurveySubmissionListItem-action', actionStatus );

        return (
            <div className="SurveySubmissionListItem"
                onClick={ this.props.onItemClick }>
                <div className="ListItem-date">
                    <span className="date">
                        { timestamp.format('{d}/{M}, {yyyy}') }</span>
                    <span className="time">
                        { timestamp.format('{HH}:{mm}') }</span>
                </div>
                <div className="SurveySubmissionListItem-content">
                    <div className="SurveySubmissionListItem-survey">
                        { surveyTitle }</div>
                        <div className="SurveySubmissionListItem-respondent">
                            <div className="SurveySubmissionListItem-avatar">
                                { respondentAvatar }
                            </div>
                            <span className="SurveySubmissionListItem-name">
                                { respondentName }
                            </span>
                        </div>
                    <div className="SurveySubmissionListItem-progress"/>
                </div>
                <div className={ actionClassNames }/>
            </div>
        );
    }
}

