export abstract class BaseDevice {
    public readonly id: number;

    public start(): void {

    }

    public stop(): void {

    }

    public setup(config: {[key: string]: string}) {}
}