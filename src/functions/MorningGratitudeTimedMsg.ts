import { app, InvocationContext, Timer } from "@azure/functions";
import { getTwilioClient, getTwilioMessagingResponse } from "../utils/twilioClient";
import { writeToCosmosDB } from "../utils/cosmosClient";

// Call the twilio client singleton

export async function MorningGratitudeTimedMsg(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Morning gratitude timer msg triggered.');
    const twilioClient = getTwilioClient();
    
    try {
        const morningGratitudeOpeningMsg: string = `Good morning champ! God gave you the gift of living another day, and that is amazing! name 3 things you are thankful for.`;
    
        const twilioPhone: string = process.env['TwilioPhone'];
        if (!twilioPhone) throw new Error("Could not retrieve the twilio phone");
        const myPhone: string = process.env['MyPhone'];
        if (!myPhone) throw new Error("Could not retrieve my own phone");

        // Send the message to the user over SMS through Twilio
        await twilioClient.messages
            .create({
                body: morningGratitudeOpeningMsg,
                from: twilioPhone,
                to: myPhone
            })
            .then(message => console.log(message.sid))
            .catch((reason) => {
                context.log("Error on sending the message:", reason);
            });

        // Prepare the cosmos db item of the user message
        const item = {
            id: new Date().toISOString() + Math.random().toString(36).substring(2),
            from: twilioPhone,
            to: myPhone,
            body: morningGratitudeOpeningMsg,
            dateCreated: new Date().toISOString()
        };

        // Save the message to cosmos db
        await writeToCosmosDB(item)
            .then(() => {
                context.log("User response Item written to Cosmos DB:", item);
            })
            .catch((error) => {
                context.log("Error writing user response to Cosmos DB:", error);
            });
        
    } catch (error) {
        context.log("Error at sending a message:", error?.message || error);
    }
}

app.timer('MorningTimerMsg', {
    schedule: '0 0 10 * * *',
    handler: MorningGratitudeTimedMsg
});
