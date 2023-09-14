export const runtime = 'edge';

import Profile from '../profile'
export default function ProfilePage({
    params,
}: {
    params: { id: string };
}) {
    return (
        <>
            <Profile/>
        </>
    );
}