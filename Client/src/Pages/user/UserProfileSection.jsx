import { Card } from "flowbite-react";
import React from "react";
import { useAuth } from "../../Context/auth";
function UserProfileSection() {
  const [auth] = useAuth();

  return (
    <div>
      <Card className="w-[700px] flex ">
        <div className="flex items-center gap-6 border-b-2 pb-2 ">
          <img
            src={auth?.user?.avatar}
            alt="profile-pic"
            className="rounded-full "
            width={"100px"}
          />
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
              {auth?.user?.name}
            </h5>
            {auth?.user?.email}
          </span>
        </div>
        <div>Personal Info</div>
        <div className="flex flex-col items- gap-6 border-b-2 pb-2 ">
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              <span>Address: </span>
              {auth?.user?.address}
            </h5>
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ">
            <h5 className="mb-1 text-lg font-medium text-gray-900 dark:text-white">
              <span>Mobile No : </span>
              {auth?.user?.phone}
            </h5>
          </span>
        </div>
      </Card>
    </div>
  );
}

export default UserProfileSection;
