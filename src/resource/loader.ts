import { Schema } from "./schema";
import _, { Dictionary } from "lodash";

export type ResourceID = string;

export interface ResourceLoader {
    load<T>(resourceID: ResourceID): T;
}

export class BasicLoader implements ResourceLoader {
    readonly resources: any;

    constructor(resources: any) {
        this.resources = resources;
    }

    load<T>(resourceID: ResourceID): T {
        let result: any = this.resources;
        resourceID.split(".").forEach(part => {
            if (Array.isArray(result)) {
                result = result.find(o => o.name === part);
            } else {
                result = result[part];
            }
            if (!result) throw new Error(`Resource ${resourceID} does not exist`);
        });
        return result as T;
    }
}
