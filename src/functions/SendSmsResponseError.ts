import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getTwilioMessagingResponse } from "../utils/twilioClient";

export async function SendSmsResponseError(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const twiml = getTwilioMessagingResponse();
    twiml.message('An error occurred.');


    return {
        body: twiml.toString(),
        status: 200,
        headers: {
            'Content-Type': 'text/xml'
        }
    };
};

app.http('SendSmsResponseError', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "send-sms-response-error",
    handler: SendSmsResponseError
});
