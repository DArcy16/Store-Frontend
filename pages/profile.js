import React from 'react'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router';

export const getServerSideProps = withPageAuthRequired();

const profile = ({ user }) => {
    const router = useRouter();

  return (
    <main className='bg-white border w-1/2 p-4 mx-auto rounded'>
        {user ? (
            <div className='flex flex-col items-center content-center gap-4'>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <button onClick={() => router.push('/api/auth/logout')} className='btn btn-primary'>Logout</button>
            </div>
        ) : null
        
    }
    </main>
  )
}

export default profile