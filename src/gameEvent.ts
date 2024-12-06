import { EventEmitter } from "events";

export type GameEvent = "gamelost" | "gamestart" | "gamewon" | "pause" | "resume";

class GemeEventEmitter extends EventEmitter {
    on(event: GameEvent, listener: () => void): this {
        return super.on(event, listener);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    emit(eventName: GameEvent, ...args: any[]): boolean {
        return super.emit(eventName, ...args);
    }
}

export const gameEvents = new GemeEventEmitter();
