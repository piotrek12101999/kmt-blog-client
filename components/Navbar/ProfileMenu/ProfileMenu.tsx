import { Avatar, Menu, MenuItem } from "@material-ui/core";
import { useState } from "react";

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>): void =>
    setAnchorEl(event.currentTarget);

  const handleClose = (): void => setAnchorEl(null);

  return (
    <>
      <Avatar
        className="navbar__wrapper__buttons__button--avatar"
        onClick={handleClick}
        alt="profile picture"
        src="https://scontent-frx5-1.xx.fbcdn.net/v/t1.0-1/41928419_1196636853835690_1907941974598483968_n.jpg?_nc_cat=104&_nc_oc=AQnIJz0-y0Fnf79_YoEw1y8mmET3k_sNFqpqSIlDzGeCT0DGg18aOPDkysIIU53uPkzmuzw2ZCxCdk5as998duUV&_nc_ht=scontent-frx5-1.xx&oh=0d58c87b41a111881a5b01b557f04cee&oe=5DCEDB4C"
      />
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted={true}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}> Profil </MenuItem>
        <MenuItem onClick={handleClose}> Moje konto </MenuItem>
        <MenuItem onClick={handleClose}> Wyloguj się </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileMenu;
