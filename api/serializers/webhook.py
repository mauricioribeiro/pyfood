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

                if 'score' in result:
                    self.score = float(result['score'])

            if 'id' in data:
                self.id = data['id']

            if 'sessionId' in data:
                self.session_id = data['sessionId']

