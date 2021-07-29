import STAN from 'node-nats-streaming';

class NatsWrapper {
    private _client?: STAN.Stan;

    get client() {
        if (!this._client){
            throw new Error("Cannot access NATS client before connecting");
        }

        return this._client;
    }

    connect(clusterID: string, clientID: string) {
        this._client = STAN.connect(clusterID, clientID);

        return new Promise<void>((resolve, reject) => {
            this.client.on('connect', () => {
                console.log("Connected to NATS");
                resolve();
            });

            this.client.on('error', (err) => {
                reject(err);
            });
        })
    }
}

export const natsWrapper = new NatsWrapper();