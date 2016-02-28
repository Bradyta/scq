from models.basemodel import BaseModel
import time
import random
import logging


class Group(BaseModel):

    def requiredFields(self):
        return ['id', 'active_surveys', 'inactive_surveys', 'subscribers']

    def fields(self):
        return {
            'id': (self.is_string, self.is_not_empty,),
            'active_surveys': (self.is_list, ),
            'inactive_surveys': (self.is_list,),
            'subscribers': (self.is_list,),
        }

    def default(self):
        return {
            'id': "",
            'active_surveys': [],
            'inactive_surveys': [],
            'subscribers': []
        }

    def subscribe_user(self, user_id, group_id):
        result = super(Group, self).subscribe_user(user_id, group_id, 'subscribed_groups')
        group_data = self.get_item(group_id)
        if group_data is None:
            message = "group_id {0} does not correspond to a value in the database".format(group_id)
            return logging.error(message)
        for survey_id in group_data.get('active_surveys', []):
            self.send_user_survey(user_id, survey_id)
        return result

    def unsubscribe_user(self, user_id, group_id):
        return super(Group, self).unsubscribe_user(user_id, group_id, 'subscribed_groups')

    def create_generic_item(self):
        data = self.default()
        data['id'] = str(time.time())
        return self.create_item(data)
