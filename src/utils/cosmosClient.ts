import { CosmosClient } from "@azure/cosmos";

let cosmosClient: CosmosClient | undefined = undefined;
const databaseId: string = process.env['CosmosDbDatabase'];
const containerId: string = process.env['CosmosDbContainer'];

export function getCosmosClient() {
    if (!cosmosClient) {
        cosmosClient = new CosmosClient(process.env['CosmosDbConnectionString']);
    }
    return cosmosClient;
}


// Write to Cosmos DB function
export async function writeToCosmosDB(data: any) {
    const client = getCosmosClient();
    const database = client.database(databaseId);
    const container = database.container(containerId);

    try {
        const { resource: createdItem } = await container.items.create(data);
        console.log(`Created item with id: ${createdItem.id}`);
        return createdItem;

    } catch (error) {
        console.error("Error writing to Cosmos DB:", error);
        throw error;
    }
}

// Read all items from Cosmos DB function
export async function readAllFromCosmosDB() {
    const client = getCosmosClient();
    const database = client.database(databaseId);
    const container = database.container(containerId);

    try {
        const { resources: items } = await container.items.readAll().fetchAll();
        return items;
    } catch (error) {
        console.error("Error reading from Cosmos DB:", error);
        throw error;
    }
}
