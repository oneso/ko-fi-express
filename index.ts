import { Express, Request } from 'express';

import { Config, mergeConfig, RequestData, Type } from '@ko-fi/types';

export const kofi = (app: Express, config?: Partial<Config<Request>>) => {
    const conf = mergeConfig(config);

    app.post(conf.endpoint, async (req, res, next) => {
        const { data } = req.body as { data: string; };

        try {
            const parsed: RequestData = JSON.parse(data);

            await conf.onData?.(parsed, req);

            switch (parsed.type) {
                case Type.Commission:
                    await conf.onCommission?.(parsed, req);
                    break;
                case Type.Donation:
                    await conf.onDonation?.(parsed, req);
                    break;
                case Type.ShopOrder:
                    await conf.onShopOrder?.(parsed, req);
                    break;
                case Type.Subscription:
                    await conf.onSubscription?.(parsed, req);
                    break;
            }
        } catch (err) {
            console.error('Ko-fi request error: ', err);
            res.sendStatus(400);
        }

        res.sendStatus(200);
    });
};
