import json
import logging
from http.client import OK

import requests

from pyfood.settings import PAGE_TOKEN_ACCESS


class FacebookService:

    @staticmethod
    def get_user_info(page_user_id):
        user = {
            'profile_pic': None,
            'id': None,
            'first_name': None,
            'last_name': None
        }

        if page_user_id and PAGE_TOKEN_ACCESS:
            url = 'https://graph.facebook.com/v2.6/%s?fields=first_name,last_name,profile_pic&access_token=%s' %(
                page_user_id,
                PAGE_TOKEN_ACCESS
            )
            response = requests.get(url)
            try:
                if response.status_code == OK:
                    user = json.loads(response.content.decode('utf8'))
            except Exception as e:
                logger = logging.getLogger(__name__)
                logger.error("Fail to get facebook graph data: " + e.__str__())

        return user

