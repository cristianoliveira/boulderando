## Boulderando

Boulderando is a toy project made by Bouldering Fans that got sick of having to book bouldering sessions in Berlin because of COVID restrictions.
Together with [its backend](https://github.com/juanibiapina/bouldering-scheduler), it allows you to book bouldering sessions with a click of a button on any device.

https://boulderando.vercel.app/

**This app only uses data stored on your browser**

## Getting Started

Prepare the environment
```bash
cp .env.example .env
```

And then
```bash
yarn && yarn dev
```
Or simply
```
docker-compose up
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

## Tests

This project contains unit and e2e tests using cypress. In order to run it execute:

All tests in headless mode
```
yarn test
yarn test:ui
yarn test:e2e
```

Or running on Cypress UI

```
yarn cy:open
yarn cy:open:e2e
```

## Environment Variable

Before deploying your version of the app, make sure you have set all variables declared in `.env.exaple` into vercel platform: `https://vercel.com/crisoliveira/<your-project>/settings`

## Deploy your own using Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fcristianoliveira%2Fboulderando&env=NEXT_PUBLIC_API_URL&project-name=my-boulderando)

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Licence

MIT
