

import AnimationWrapper from "../AnimationWrapper";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Form from "./form";

const Page = async() => {
  const session = await getServerSession(authOptions)
  if(session) {
    redirect("/")
  }

  return (
    <AnimationWrapper>
      <section className="mb-20">
        <div className="flex flex-col items-center justify-center px-6 py-20 mx-auto lg:py-0 ">
          <div className="w-full bg-gray-100 rounded-lg shadow-gray-500 shadow-md md:mt-0 sm:max-w-md xl:p-0  dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-600 md:text-2xl ">
                Create New Account:
              </h1>
              <Form/>
            </div>
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export default Page;
