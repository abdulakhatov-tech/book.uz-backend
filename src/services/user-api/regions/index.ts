import { RegionModel } from "../../../models";

class RegionsService {
    constructor() {}

    async getAllRegions() {
        const regions = await RegionModel.find().exec();

        return regions;
    }
}

export default RegionsService;