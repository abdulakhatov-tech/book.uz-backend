import { DistrictModel } from "../../../models";

class DistrictsService {
  constructor() {}

  async getAllDistricts(regionId: string) {
    const districts = await DistrictModel.find({ regionId: regionId }).select('_id name').exec();

    return districts;
  }
}

export default DistrictsService;
