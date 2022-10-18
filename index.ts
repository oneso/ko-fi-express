import { Express, Request } from 'express';

import { kofiHandler } from '@ko-fi/handler';
import { Config, mergeConfig } from '@ko-fi/types';

export const kofi = (app: Express, config?: Partial<Config<Request>>) => {
    const conf = mergeConfig({ endpoint: '/webhook', ...config });

    app.post(conf.endpoint, async (req, res) => {
        const { data } = req.body as { data: string; };
        const status = await kofiHandler(data, conf, req);

        res.sendStatus(status);
    });
};
