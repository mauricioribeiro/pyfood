import json
import logging


class WebhookSerializer:

    def __init__(self, request):
        data = None

        try:
            data = json.loads(request.body.decode("utf-8"))
        except Exception as e:
            logger = logging.getLogger(__name__)
            logger.error("Fail to get webhook request data: " + e.__str__())

        if data:
            if 'originalRequest' in data:
                original_request = data['originalRequest']

                if 'source' in original_request:
                    self.source = original_request['source']

                if 'data' in original_request:
                    if 'sender' in original_request['data'] and 'id' in original_request['data']['sender']:
                        self.sender_id = original_request['data']['sender']['id']

                    if 'message' in original_request['data'] and 'text' in original_request['data']['message']:
                        self.message = original_request['data']['message']['text']

            if 'result' in data:
                if 'action' in data['result']:
                    self.action = data['result']['action']

            if 'parameters' in data and data['parameters']:
                self.parameters = data['parameters']

            if 'id' in data:
                self.id = data['id']

            if 'sessionId' in data:
                self.session_id = data['sessionId']

