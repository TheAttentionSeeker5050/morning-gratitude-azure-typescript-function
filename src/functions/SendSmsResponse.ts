import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getTwilioMessagingResponse } from "../utils/twilioClient";

const twiml = getTwilioMessagingResponse();

export async function SendSmsResponse(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    
    twiml.message('Message received and relayed through azure functions!');

    return { body: `Receiving gratitude sms response`, status: 200 };
};

app.http('SendSmsResponse', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "send-sms-response",
    handler: SendSmsResponse
});
