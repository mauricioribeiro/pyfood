import json
import logging


class WebhookSerializer:

    def __init__(self, request=None):
        self.id = None
        self.source = None
        self.parameters = None
        self.message = None
        self.action = None
        self.score = None
        self.sender_id = None
        self.recipient_id = None
        self.session_id = None
        self.default_message = None

        if request:
            self.set_request(request)

    def set_request(self, request):
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

                    if 'recipient' in original_request['data'] and 'id' in original_request['data']['recipient']:
                        self.recipient_id = original_request['data']['recipient']['id']

            if 'result' in data:
                result = data['result']

                if 'action' in result:
                    self.action = result['action']

                if 'parameters' in result and result['parameters']:
                    self.parameters = result['parameters']

                    if 'number' in self.parameters and self.parameters['number']:
                        self.parameters['number'] = int(self.parameters['number'])

                if 'resolvedQuery' in result:
                    self.message = result['resolvedQuery']

                if 'fulfillment' in result and 'speech' in result['fulfillment']:
                    self.default_message = result['fulfillment']['speech']

                if 'score' in result:
                    self.score = float(result['score'])

            if 'id' in data:
                self.id = data['id']

            if 'sessionId' in data:
                self.session_id = data['sessionId']

    def answer(self, text, append_default_message=True):
        message = text + " " + self.default_message if append_default_message and self.default_message else text
        return {
            "speech": message,
            "displayText": message,
            "contextOut": None,
            "source": self.source,
            "data": None
        }
