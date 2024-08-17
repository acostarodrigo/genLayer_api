# GenLayer Full stack exam
API for Full stack exam on Express

## Env variables
```
# Server
SERVER_CORS_WHITELISTED=http://localhost:3000,http://localhost:3001
SERVER_JWT_SEED=[Your JVT Seed]
SERVER_PORT=4002

# Pinata
PINATA_JWT=[Your Pinana JVT]
PINATA_GATEWAY=[Your pinata Gateway]
PINATA_GROUP=[Your Pinata group]
```

## Controller File Upload

Listining at route ```/api/upload``` expects a file to place on IPFS.
Once placed, metadata JSON is generated with the following schema:

```
{
    name: "Rodrigo Acosta",
    image: `ipfs://${fileHash}`,
    description: "Full stack exam",
}
```

This metadata file is stored on IPFS and return the IPFS SID to the caller.


## Execution
To start a local instance of the API execute:

```
npm run start:dev
```

API generates a JWT token to validate calls from authorized clients. to generate a new JWT execute:

```
npm run generate_token:dev
```

## Live API
For the live demo the API can be accessed at:
[https://genlayer-api-856f32d99092.herokuapp.com/](https://genlayer-api-856f32d99092.herokuapp.com/)
