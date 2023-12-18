import AccountProfile from '@/components/forms/AccountProfile';
import { fetchUser } from '@/lib/actions/user.action';
import {currentUser} from '@clerk/nextjs'

async function Page () {
    const user = await currentUser();
    if(!user) return null;

    const userInfor = await fetchUser(user.id);

    const userData = {
        id: user.id,
        objectId: userInfor?._id.toString(),
        firstName: userInfor ? userInfor.firstName : user.firstName,
        lastName: userInfor ? userInfor.lastName : user.lastName,
        image: userInfor ? userInfor.image: user.imageUrl,
        email :  user.emailAddresses[0].emailAddress,
    }

  

    return (
        <>
        <main className='mx-auto flex max-w-3xl flex-col justify-start px-10 py-20'>
            <h1 className='head-text'>Onboarding</h1>
            <p className='mt-3 text-base-regular text-light-2'>
                Complete your profile now, to use Magic Post.
            </p>

            <section className='mt-9 bg-dark-2 p-10'>
                <AccountProfile user={userData} btnTitle='Continue' />
            </section>
        </main>
        </>
    )
}

export default Page;