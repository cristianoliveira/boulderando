## Boulderando 

This is a toy project made by Bouldering Fans that got sick of having to book session in Berlin because of COVID restrictions.
Together with [its backend](https://github.com/juanibiapina/bouldering-scheduler) it allows you to book bouldering sessions with a click of a button on any device.

https://boulderando.vercel.app/

**This app only uses data stored on your browser** 

## Getting Started

```bash
yarn && yarn dev
```
Or simply 
```
docker-compose up
```

Open [http://localhost:3333](http://localhost:3333) with your browser to see the result.

### Tests 

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

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Licence

MIT
