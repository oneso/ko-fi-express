import { Express, Request as ExpressRequest } from 'express';

import { CommissionData, DonationData, RequestData, ShopOrderData, SubscriptionData, Type } from '@ko-fi/types';

const defaultConfig: Config = {
    endpoint: '/webhook',
    onData: () => null,
    onCommission: () => null,
    onDonation: () => null,
    onShopOrder: () => null,
    onSubscription: () => null,
};

export const kofi = (app: Express, config?: Partial<Config>) => {
    const conf = { ...defaultConfig, ...config };

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

export interface Config {
    endpoint: string;
    onData: Callback<RequestData>;
    onCommission: Callback<CommissionData>;
    onDonation: Callback<DonationData>;
    onShopOrder: Callback<ShopOrderData>;
    onSubscription: Callback<SubscriptionData>;
}

export type Callback<TData> = (data: TData, req: ExpressRequest) => void | null | undefined | Promise<void>;
