import React, { useEffect, useState } from "react";
import { User, ErrorType } from "../types";
import { useFeedError, useFeedSuccess } from "@/utils/feedHooks";
import { PositionType, SubTree } from "@/components/SubTree";
import { useRouter } from "next/router";
import { getUsers, assignManager, deleteUser } from "@/api";
import { AddUserDrawer } from "@/components/AddUserDrawer";
import { ActionsBox } from "@/components/ActionsBox";

export type UserForUpdateType = {
  id: string;
  position: PositionType | null;
};

export const MainPage: React.FC = () => {
  const feedError = useFeedError();
  const feedSuccess = useFeedSuccess();
  const router = useRouter();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [managerForUpdate, setManagerForUpdate] = useState<UserForUpdateType>({
    id: "",
    position: null,
  });
  const [subordinateForUpdate, setSubordinateForUpdate] =
    useState<UserForUpdateType>({
      id: "",
      position: null,
    });

  const handleSetManager = (userForUpdate: UserForUpdateType) => {
    if (subordinateForUpdate.id) {
      setManagerForUpdate(userForUpdate);
    }
  };

  function onDeleteUser(userId: string) {
    deleteUser(userId)
      .then((res) => {
        if (!res.message) {
          // message only if error
          feedSuccess("User have been successfully deleted.");
          router.reload();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err: unknown) => {
        if ((err as ErrorType)?.message) {
          feedError((err as ErrorType)?.message);
        }
      });
  }

  function onAssignManager() {
    if (!subordinateForUpdate.id || !managerForUpdate.id) {
      return;
    }
    assignManager(subordinateForUpdate.id, managerForUpdate.id)
      .then((res) => {
        if (!res.message) {
          // message only if error
          feedSuccess("Manager have been successfully assigned.");
          router.reload();
        } else {
          return Promise.reject(res);
        }
      })
      .catch((err: unknown) => {
        if ((err as ErrorType)?.message) {
          feedError((err as ErrorType)?.message);
        }
      });
  }

  useEffect(() => {
    const getAllUsers = async () => {
      getUsers()
        .then((res) => {
          if (!res.message) {
            // message only if error
            setUsers(res);
          } else {
            return Promise.reject(res);
          }
        })
        .catch((err: unknown) => {
          if ((err as ErrorType)?.message) {
            feedError((err as ErrorType)?.message);
          }
        });
    };
    getAllUsers();
  }, [feedError]);

  return (
    <>
      <svg
        id="svg-lines"
        style={{
          position: "fixed",
          width: "100%",
          height: "100vh",
          zIndex: "0",
        }}
      >
        {managerForUpdate.position && subordinateForUpdate.position && (
          <line
            x1={subordinateForUpdate.position.x}
            y1={subordinateForUpdate.position.y}
            x2={managerForUpdate.position.x}
            y2={managerForUpdate.position.y}
            stroke="red"
          />
        )}
      </svg>
      {users
        .filter((user) => !user.manager)
        .map((user, index, array) => (
          <SubTree
            key={user.id}
            root={user}
            allUsers={users}
            levelY={0}
            startX={((window.innerWidth - 300) / array.length) * index + 250}
            fullWidth={(window.innerWidth - 300) / array.length}
            onDelete={onDeleteUser}
            setSubordinateForUpdate={setSubordinateForUpdate}
            setManagerForUpdate={handleSetManager}
          />
        ))}
      <ActionsBox
        setIsDrawerOpen={setIsDrawerOpen}
        onAssignManager={onAssignManager}
        isChangeManagerButton={
          !!managerForUpdate.position && !!subordinateForUpdate.position
        }
        isChangeManagerHelper={
          !managerForUpdate.position && !!subordinateForUpdate.position
        }
      />

      <AddUserDrawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen} />
    </>
  );
};
