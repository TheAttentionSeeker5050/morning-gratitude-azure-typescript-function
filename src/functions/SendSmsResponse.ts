import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";
import { getTwilioMessagingResponse } from "../utils/twilioClient";
import { writeToCosmosDB } from "../utils/cosmosClient";


export async function SendSmsResponse(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log(`Http function processed request for url "${request.url}"`);

    const twiml = getTwilioMessagingResponse();

    try {
        // Save the message from the user to cosmos db
        const requestDataReader = await request.body.getReader().read();

        const requestData = new URLSearchParams(new TextDecoder("utf-8").decode(requestDataReader.value));
        

        const messageBody: string = requestData.get("Body") || ""; // Because we want to use the multimedia formatting of Twilio sms to save it as it is to the cosmos db
        context.log("messageBody:", messageBody);
        const messageFrom: string = requestData.get("From") || "";
        const messageTo: string = requestData.get("To") || ""; 
        
        // Prepare the cosmos db item of the user message
        const item = {
            id: new Date().toISOString() + Math.random().toString(36).substring(2),
            from: messageFrom,
            to: messageTo,
            body: messageBody,
            dateCreated: new Date().toISOString()
        };

        await writeToCosmosDB(item)
            .then(() => {
                context.log("User response Item written to Cosmos DB:", item);
            })
            .catch((error) => {
                context.log("Error writing user response to Cosmos DB:", error);
            });

        const twilioResponseMsg = "That's good to hear! Remember to be thankful for the little things in life. I hope you have a great day and achieve world domination!";

        // Prepare the cosmos db item of the twilio response
        const twilioResponseItem = {
            id: new Date().toISOString() + Math.random().toString(36).substring(2),
            from: messageTo,
            to: messageFrom, // We switch them over because Twilio sends the message from the "To" number to the "From" number
            body: twilioResponseMsg,
            dateCreated: new Date().toISOString()
        };

        await writeToCosmosDB(twilioResponseItem)
            .then(() => {
                context.log("Twilio response item written to Cosmos DB:", twilioResponseItem);
            })
            .catch((error) => {
                context.log("Error writing Twilio response item to Cosmos DB:", error);
            });

        twiml.message(twilioResponseMsg);

        return {
            body: twiml.toString(),
            status: 200,
            headers: {
                'Content-Type': 'text/xml'
            }
        };
        
    } catch (error) {
        twiml.message("Error processing your request. Please try again later." + error?.message);
        return {
            body: twiml.toString(),
            status: 200,
            headers: {
                'Content-Type': 'text/xml'
            }
        };
    }
};

app.http('SendSmsResponse', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: "send-sms-response",
    handler: SendSmsResponse
});
