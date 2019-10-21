import { Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { IUser } from "../../../models/user.model";

interface IAvatarProps {
  loggedInUser: IUser;
  handleLogOut: () => void;
}

const Avatar: React.FC<IAvatarProps> = ({ loggedInUser, handleLogOut }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <div className="profile_picture" onClick={handleClick} />
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleLogOut}>Logout</MenuItem>
      </Menu>
      <style jsx={true}>{`
        .profile_picture {
          height: 40px;
          width: 40px;
          border-radius: 100%;
          background-image: url(${loggedInUser.profile_picture ||
            "/static/default_profile_picture.jpg"});
          background-repeat: no-repeat;
          background-position: center center;
          background-size: contain;
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default Avatar;
