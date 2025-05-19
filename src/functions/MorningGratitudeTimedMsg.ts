import { app, InvocationContext, Timer } from "@azure/functions";
import { getTwilioClient } from "../utils/twilioClient";

// Call the twilio client singleton
const twilioClient = getTwilioClient();

export async function MorningGratitudeTimedMsg(myTimer: Timer, context: InvocationContext): Promise<void> {
    context.log('Morning gratitude timer msg triggered.');
    try {
        const morningGratitudeOpeningMsg: string = `Good morning champ! God gave you the gift of living another day, and that is amazing! name 3 things you are thankful for.`;
    
        const twilioPhone = process.env['TwilioPhone'];
        if (!twilioPhone) throw new Error("Could not retrieve the twilio phone");
        const myPhone = process.env['MyPhone'];
        if (!myPhone) throw new Error("Could not retrieve my own phone");
    
        twilioClient.messages
            .create({
                body: morningGratitudeOpeningMsg,
                from: twilioPhone,
                to: myPhone
            })
            .then(message => console.log(message.sid))
            .catch((reason) => {
                context.log("Error on sending the message:", reason);
            });
        
    } catch (error) {
        context.log("Error at sending a message:", error?.message || error);
    }
}

app.timer('MorningTimerMsg', {
    schedule: '0 0 10 * * *',
    handler: MorningGratitudeTimedMsg
});
