import { auth } from "@/auth";
import { SignOut } from "@/components/SignOut";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import { SectionUserPets } from "@/components/SectionUserPets";

const Account = async () => {
  const session = await auth();
  if (!session?.user?.email) redirect("/");
  return (
    <main className="py-8 space-y-8">
      <section className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          {session.user.image && (
            <Image
              src={session.user.image}
              height={50}
              width={50}
              priority
              alt={"profile image"}
              className="rounded-full"
            />
          )}
          <p className="text-3xl font-bold">{session.user.name}</p>
          <p className="pb-2">{session.user.email}</p>
          <SignOut />
          {/* need to get database user id first to do this */}
          {/* {user.id && <DeleteButton id={user.id} type="users" />} */}
        </div>
      </section>
      <hr />
      <SectionUserPets user={session.user.name ?? ""} />
    </main>
  );
};

export default Account;
