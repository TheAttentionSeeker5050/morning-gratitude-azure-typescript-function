import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getTwilioClient } from "../utils/twilioClient";

// Call the twilio client singleton
const twilioClient = getTwilioClient();

export async function TwilioDemo(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);
    
    const twilioPhone = process.env['TwilioPhone'];
    if (!twilioPhone) throw new Error("Could not retrieve the twilio phone");
    const myPhone = process.env['MyPhone'];
    if (!myPhone) throw new Error("Could not retrieve my own phone");
    
        
    twilioClient.messages
        .create({
            body: 'hello world',
            from: twilioPhone,
            to: myPhone        })
        .then(message => console.log(message.sid))
        .catch((reason): HttpResponseInit => {
            return { body: `Error in sending msg ${reason}`, status: 400 }
        });

    return { body: `Hello, twilio SMS!` };
};

app.http('TwilioDemo', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    route: "demo-sms",
    handler: TwilioDemo
});
