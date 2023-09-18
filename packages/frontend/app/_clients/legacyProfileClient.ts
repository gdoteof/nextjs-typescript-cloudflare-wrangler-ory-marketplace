import { get } from '../_utils/restClient';
import { LegacyProfile } from '../../../../common/types/legacy_profile';

class LegacyProfileClient {
    private static endpoint = '/api/legacyprofile';

    static async fetchById(id: string): Promise<LegacyProfile> {
        const response = await get(`${this.endpoint}/${id}`);
        return response.json();
    }
}

export default LegacyProfileClient;