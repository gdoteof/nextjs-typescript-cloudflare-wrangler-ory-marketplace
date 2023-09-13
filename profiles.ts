
export const getProfile = async (id: string) => {
  const profile = await LEGACY_PROFILE.get(id);
  return profile;
};
export const createProfile = async (id: string, data: any) => {
  await LEGACY_PROFILE.put(id, JSON.stringify(data));
};
export const updateProfile = async (id: string, data: any) => {
  await LEGACY_PROFILE.put(id, JSON.stringify(data));
};
export const deleteProfile = async (id: string) => {
  await LEGACY_PROFILE.delete(id);
};
