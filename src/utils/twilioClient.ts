// Twilio Client singleton
import twilio from "twilio";
import MessagingResponse from "twilio/lib/twiml/MessagingResponse";

const authToken = process.env["TwilioAuthToken"]
const accountSid = process.env["TwilioAccountSID"]

let twilioClient: twilio.Twilio | undefined = undefined;
let twiml: MessagingResponse | undefined = undefined;

// Run singleton function
export function getTwilioClient () {
    if (!twilioClient) {
        twilioClient = twilio(accountSid, authToken);
    }
    return twilioClient;
} 

// Run singleton function
export function getTwilioMessagingResponse() {
    if (!twiml) {
        twiml = new MessagingResponse();
    }

    return twiml;
}