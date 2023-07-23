
import { useSession } from 'next-auth/react'
import Head from 'next/head'
import React from 'react'
import AccountLayout from '~/components/Shared/AccountLayout'

export default function DasboardPage() {
  const session = useSession()
  return (
    <AccountLayout user={session.data?.user}>
      <Head>
        <title>Dashboard - FuseTips</title>
      </Head>
      <div>DasboardPage</div>
    </AccountLayout>
  )
}
