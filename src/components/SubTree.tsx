import React, { useEffect, useRef, useState } from "react";
import Draggable from "react-draggable";
import { User } from "../types";
import { createPortal } from "react-dom";
import { CARD_HEIGHT, CARD_WIDTH } from "../consts";
import {
  Card,
  styled,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import DeleteIcon from "@mui/icons-material/Delete";
import { UserForUpdateType } from "./MainPage";

export type PositionType = {
  x: number;
  y: number;
};

type SubTreeProps = {
  root: User;
  allUsers: User[];
  managerPosition?: PositionType;
  levelY: number;
  startX: number;
  fullWidth: number;
  onDelete: (id: string) => void;
  setManagerForUpdate: (userForUpdate: UserForUpdateType) => void;
  setSubordinateForUpdate: (userForUpdate: UserForUpdateType) => void;
};

export const SubTree: React.FC<SubTreeProps> = ({
  root,
  allUsers,
  managerPosition,
  levelY,
  startX,
  fullWidth,
  onDelete,
  setManagerForUpdate,
  setSubordinateForUpdate,
}) => {
  const elementRef = useRef<Draggable>(null);
  const [position, setPosition] = useState<PositionType>({
    x: startX + fullWidth / 2 - CARD_WIDTH / 2,
    y: levelY * (CARD_HEIGHT + 50),
  });

  const getUserWithSubordinates = (user: User) => {
    return allUsers.filter(({ id }) => user.id === id)[0];
  };

  const onDrugSubordinate = (e: any, position: PositionType) => {
    const { x, y } = position;
    setPosition({ x, y });
  };

  const handleDeleteClick = async () => {
    await onDelete(root.id);
  };

  const handleSetSubordinateClick = () => {
    setSubordinateForUpdate({
      id: root.id,
      position: {
        x: position.x + CARD_WIDTH / 2,
        y: position.y + CARD_HEIGHT / 2,
      },
    });
  };

  const handleSetManagerClick = () => {
    setManagerForUpdate({
      id: root.id,
      position: {
        x: position.x + CARD_WIDTH / 2,
        y: position.y + CARD_HEIGHT / 2,
      },
    });
  };

  useEffect(() => {
    if (elementRef.current) {
      const { position } = elementRef.current.props;
      setPosition({
        x: position?.x ? position?.x : 0,
        y: position?.y ? position?.y : 0,
      });
    }
  }, [elementRef, setPosition]);

  const svgElement =
    global?.document?.getElementById("svg-lines") ?? global?.document?.body;

  if (!root) {
    return null;
  }

  return (
    <>
      <Draggable
        onDrag={onDrugSubordinate}
        ref={elementRef}
        position={position}
      >
        <CardStyled variant="outlined">
          <CardActionArea onClick={handleSetManagerClick}>
            <CardContent>
              <Typography>{root.name}</Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton onClick={handleDeleteClick} aria-label="delete user">
              <Tooltip title="Delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              onClick={handleSetSubordinateClick}
              aria-label="change manager"
            >
              <Tooltip title="Change manager">
                <AssignmentIndIcon />
              </Tooltip>
            </IconButton>
          </CardActions>
        </CardStyled>
      </Draggable>
      {svgElement &&
        createPortal(
          <>
            {managerPosition && (
              <line
                x1={managerPosition.x + CARD_WIDTH / 2}
                y1={managerPosition.y + CARD_HEIGHT / 2}
                x2={position.x + CARD_WIDTH / 2}
                y2={position.y + CARD_HEIGHT / 2}
                stroke="black"
              />
            )}
          </>,
          svgElement
        )}

      {root?.subordinates?.map((user, index) => {
        const userWithSubordinates = getUserWithSubordinates(user);
        return (
          <SubTree
            key={user.id}
            root={userWithSubordinates}
            allUsers={allUsers}
            managerPosition={position}
            levelY={levelY + 1}
            startX={startX + (fullWidth / root.subordinates.length) * index}
            fullWidth={fullWidth / root.subordinates.length}
            onDelete={onDelete}
            setManagerForUpdate={setManagerForUpdate}
            setSubordinateForUpdate={setSubordinateForUpdate}
          />
        );
      })}
    </>
  );
};

const CardStyled = styled(Card)({
  height: `${CARD_HEIGHT}px`,
  width: `${CARD_WIDTH}px`,
  position: "absolute",
});
