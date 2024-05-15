const { delay, ServiceBusClient, ServiceBusMessage } = require("@azure/service-bus");

const connectionString = "Endpoint=sb://rp0041-sbus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey="
const queueName = "inputq01"

console.log("Waiting for messages...");


async function main() {
    const serviceBusClient = new ServiceBusClient(connectionString);
    const receiver = serviceBusClient.createReceiver(queueName);

    const myMessageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`);
    };

    // function to handle any errors
    const myErrorHandler = async (error) => {
        console.log(error);
    };

    // subscribe and specify the message and error handlers
    receiver.subscribe({
        processMessage: myMessageHandler,
        processError: myErrorHandler
    });

    await delay(20000);

    await receiver.close();
    await serviceBusClient.close();
}

main().catch((err) => {
    console.log("Error occurred: ", err);
    process.exit(1);
 });


