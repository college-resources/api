# <p align="center">![College Resources](https://cdn.discordapp.com/attachments/605735460635148319/624586733647953941/cr.png)</p>

# The API of College Resources

The go-to place for all your college needs. From course notes and previous exams to grades and feeding schedules.

*See [college-resources/web](https://github.com/college-resources/web) for the website source code.*

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites (Windows)

1. [NodeJS 12.X](https://nodejs.org/dist/latest-v12.x)
(Recommended version: [NodeJS 12.16.0 x64](https://nodejs.org/dist/v12.16.3/node-v12.16.3-x64.msi))

2. [Git for Windows](https://git-scm.com/download/win)

### Prerequisites (Linux)

*TBA*

### Downloading

Navigate to the folder where you want the project to be saved and run the following command:
```bash
git clone https://github.com/college-resources/api.git
```

### Preparing

1. Navigate to the root of the project and run `npm install`.

2. Create a `.env` file in the root of the project and add the following details:

```dotenv
NODE_ENV=<production/development, production is default>

MONGODB_USER=<MONGODB_USERNAME>
MONGODB_PASS=<MONGODB_PASSWORD>
MONGODB_CLUSTER=<mongo.db.domain.name/database-name?parameter=value>

AUTH0_DOMAIN=<YOUR_AUTH0_DOMAIN>
AUTH0_AUDIENCE=<YOUR_AUTH0_AUDIENCE>

SERVER_ADDRESS=http://localhost
SERVER_PORT=3000
```

### Running

#### Development

1. In the root of the project run `npm run watch`.

2. Wait for it to compile and navigate to `http://localhost:3000/graphql`.

#### Production

1. In the root of the project run
```bash
npm run production
node dist/bundle.js
```

2. When the server starts, go to `http://localhost:3000/graphql`
