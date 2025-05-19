# Morning Gratitude

This is a showcase of my abilities to write different Azure functions. At the current moment I am working on Azure functions implementations and gaining more expertise in cloud native app development and cloud operations in general. This will be used as a use sample for my next Tech Talk in Halifax, NS.

It consist of an azure function project that sends you periodic text messages early in the morning to ask you about 3 things you are thankful for today. You send a message back stating these 3 things you are thankful for, and it sends you a final automatic reply encouraging you to be happy today and keep in mind your gratitude towards the gifts of life you are every day granted. Such as having a family, health, a job, a roof over your head, food, friends, being able to walk, see, hear, grab things with our hands, etc. These are things that we take for granted but many people still today lack, and if we concentrate in what we have and are thankful for it, we can also positively concentrate more in what we can achieve and how achieve it. This is a better and more effective mindset than being sad or resentful over what we dont have and what we can't immediately control.

**Remember: Gratitude is key to happiness.**

## Installation
Refer to the azure documentation. Also you may need to make use of local.settings.json:

```json
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "UseDevelopmentStorage=true",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "APPLICATIONINSIGHTS_CONNECTION_STRING": "{top secret}",
    "AzureWebJobsSecretStorageType": "files",
    "FUNCTIONS_EXTENSION_VERSION": "~4",
    "WEBSITE_NODE_DEFAULT_VERSION": "~22",
    "WEBSITE_RUN_FROM_PACKAGE": "1",
    "CosmosDbConnectionString": "{top secret}",
    "ACS_CONNECTION_STRING": "{top secret}"
  }
}
```

## More details TBD
