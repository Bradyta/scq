import tornado.web
import tornado.gen as gen
import json
import time
import logging
import ast
from models.group import Group
from handlers.base_handler import BaseHandler, api_authorized, parse_request_json, refresh_user_cookie_callback


class GroupAPIHandler(BaseHandler):

    @api_authorized
    @refresh_user_cookie_callback
    def post(self):
        """
        Creates a new group object
        """
        potential_group_id = self.get_argument('groupname')
        if potential_group_id is None:
            return self.set_status(400, "id cannot be null")
        potential_group_data = Group().get_item(potential_group_id)
        if potential_group_data is not None:
            return self.set_status(400, "group with id {0} already exists".format(potential_group_id))
        creator_id = self.current_user['id']
        group_data = Group().default()
        group_data['creator_id'] = creator_id
        group_data['id'] = potential_group_id
        group_id = Group().create_item(group_data)
        if group_id is None:
            return self.set_status(400, "something went wrong:")
        members = self.get_arguments('members')
        members.pop(0)
        logging.info("members are {0}".format(members))
        for member in members:
            # TODO: In the future, this will invite the user.
            # I popped off the first member of the list
            # That first member is still being added to the subscription list
            # so it works.. so weird.
            Group().subscribe_user(member, group_id)
        self.set_status(200, "Success")
        self.redirect("/profile")
        return self.write(tornado.escape.json_encode(group_id))

    @api_authorized
    @parse_request_json
    def get(self):
        subscribed_groups = self.current_user.get('subscribed_groups', [])
        self.set_status(200, "Success")
        return self.write(tornado.escape.json_encode(subscribed_groups))
