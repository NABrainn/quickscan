import { Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})
export class TypeCheckService {
    isArray(value: unknown): boolean {
        return Array.isArray(value);
    }

    isObject(value: unknown): boolean {
        return value instanceof Object;
    }
}