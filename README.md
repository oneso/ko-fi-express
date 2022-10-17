Ko-fi webhook handler for Express.

For more informations visit https://ko-fi.com/manage/webhooks

---

## Installation

### npm

`npm install @ko-fi/express`

### yarn

`yarn add @ko-fi/express`

## Example

View example implementation [here](https://github.com/oneso/ko-fi-express-example);

    import express from 'express';

    import { kofi } from '@ko-fi/express';

    const app = express();

    // Enable req body parsing
    app.use(
        express.urlencoded({
            extended: true,
        })
    );

    kofi(app, {
        onData: (data, req) => {
            console.log('onData called');
        },
        onCommission: (data, req) => {
            console.log('onCommission called');
        },
        onDonation: (data, req) => {
            console.log('onDonation called');
        },
        onShopOrder: (data, req) => {
            console.log('onShopOrder called');
        },
        onSubscription: (data, req) => {
            console.log('onSubscription called');
        },
    });

    app.listen(3000);
