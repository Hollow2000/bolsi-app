import Dexie, { liveQuery, Observable } from 'dexie';

export abstract class BaseService<T, K = number> {
    // La tabla a operar, que debe ser definida en la clase hija
    protected abstract table: Dexie.Table<T, K>;

    getList(): Promise<T[]> {
        return this.table.toArray();
    }

    getObservable(): Observable<T[]> {
        return liveQuery(() => this.table.toArray());
    }

    add(item: T): Promise<K> {
        return this.table.add(item);
    }

    update(id: K, updates: Partial<T>): Promise<number> {
        return this.table.update(id, updates as any);
    }

    delete(id: K): Promise<void> {
        return this.table.delete(id);
    }
}