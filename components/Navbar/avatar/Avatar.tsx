import { Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";
import { IUser } from "../../../models/user.model";

interface IAvatarProps {
  loggedInUser: IUser | null;
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

  console.log(loggedInUser);

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
          background-image: url("https://firebasestorage.googleapis.com/v0/b/kmt-blog.appspot.com/o/profile-pictures%2F512x512bb.jpg?alt=media&token=b6d3915e-0363-4dac-b9b2-a5ae059b5dbd");
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
