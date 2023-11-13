import React, { useState, useEffect } from "react";
import { Button, Collapse } from "reactstrap";
import classnames from "classnames";

// hooks
import { useRedux } from "../../../hooks/index";

// actions
import { getSettings, updateSettings } from "../../../redux/actions";

// constants
import { SETTINGS_COLLAPSES } from "../../../constants";

// interface
import { SettingsTypes } from "../../../data/settings";

// components
import Loader from "../../../components/Loader";
import AppSimpleBar from "../../../components/AppSimpleBar";
import UserCoverImage from "./UserCoverImage";
import UserProfile from "./UserProfile";
import PersonalInfo from "./PersonalInfo";
import ThemeSettings from "./ThemeSettings";
import Privacy from "./Privacy";
import Security from "./Security";
import Help from "./Help";

import axios from "axios";
const apiUrl = 'http://localhost:3001/auth/profile';


interface User {
  displayName: string;
  // Add other properties as needed
}

interface CollapseItemTypes {
  value:
    | SETTINGS_COLLAPSES.PROFILE
    | SETTINGS_COLLAPSES.HELP
    | SETTINGS_COLLAPSES.PRIVACY
    | SETTINGS_COLLAPSES.SECURITY
    | SETTINGS_COLLAPSES.THEME;
  label: string;
  icon: string;
  component: any;
}

interface AccordianItemProps {
  item: CollapseItemTypes;
  onChange: (
    id:
      | null
      | SETTINGS_COLLAPSES.PROFILE
      | SETTINGS_COLLAPSES.HELP
      | SETTINGS_COLLAPSES.PRIVACY
      | SETTINGS_COLLAPSES.SECURITY
      | SETTINGS_COLLAPSES.THEME
  ) => void;
  selectedMenu:
    | null
    | SETTINGS_COLLAPSES.PROFILE
    | SETTINGS_COLLAPSES.HELP
    | SETTINGS_COLLAPSES.PRIVACY
    | SETTINGS_COLLAPSES.SECURITY
    | SETTINGS_COLLAPSES.THEME;
}
const AccordianItem = ({
  item,
  selectedMenu,
  onChange,
}: AccordianItemProps) => {
  const isOpen: boolean =
    selectedMenu && selectedMenu === item.value ? true : false;
  const toggleCollapse = () => {
    if (isOpen) {
      onChange(null);
    } else {
      onChange(item.value);
    }
  };
  return (
    <div className="accordion-item">
      <div className="accordion-header" id="headerpersonalinfo">
        <Button
          color="none"
          className={classnames(
            "accordion-button",
            "font-size-14",
            "fw-medium",
            { collapsed: !isOpen }
          )}
          onClick={toggleCollapse}
          type="button"
        >
          <i className={classnames("text-muted", "me-3", item.icon)}></i>{" "}
          {item.label}
        </Button>
      </div>
      <Collapse
        isOpen={isOpen}
        id="personalinfo"
        className="accordion-collapse"
      >
        {item.component}
      </Collapse>
    </div>
  );
};
interface IndexProps {}
const Index = (props: IndexProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('authUser');
      const tokenObj = token ? JSON.parse(token) : null;

      if (!tokenObj) {
        console.error('No token found in localStorage');
        // Handle the absence of a token, such as redirecting to the login page
      } else {
        const headers = {
          'Authorization': `Bearer ${tokenObj.access_token}`,
          'Content-Type': 'application/json',
        };

        try {
          const response = await axios.get(apiUrl, { headers });
          setUser(response.data as User);
          console.log('User profile:', response);
        } catch (error) {
          console.error('Error retrieving user profile:', error);
        }
      }
    };

    fetchData();
  }, []); // Empty dependency array to ensure the effect runs only once

  // global store
  const { dispatch, useAppSelector } = useRedux();

  const { settingsData, getSettingsLoading } = useAppSelector(state => ({
    settingsData: state.Settings.settings,
    getSettingsLoading: state.Profile.getSettingsLoading,
    isSettingsFetched: state.Profile.isSettingsFetched,
  }));

  // get user settings
  useEffect(() => {
    dispatch(getSettings());
  }, [dispatch]);

  const [settings, setSettings] = useState<SettingsTypes>(settingsData);
  useEffect(() => {
    setSettings(settingsData);
  }, [settingsData]);

  /*
  api calling
  */
  const onChangeData = (field: string, value: any) => {
    dispatch(updateSettings(field, value));
  };

  /*
  collapse handeling
  */
  const [selectedMenu, setSelectedMenu] = useState<
    | null
    | SETTINGS_COLLAPSES.PROFILE
    | SETTINGS_COLLAPSES.HELP
    | SETTINGS_COLLAPSES.PRIVACY
    | SETTINGS_COLLAPSES.SECURITY
    | SETTINGS_COLLAPSES.THEME
  >(null);

  const collapseItems: CollapseItemTypes[] = [
    {
      value: SETTINGS_COLLAPSES.PROFILE,
      label: "Personal Info",
      icon: "bx bxs-user",
      component: <PersonalInfo user={user} basicDetails={settings.basicDetails} />,
    },
    {
      value: SETTINGS_COLLAPSES.THEME,
      label: "Themes",
      icon: "bx bxs-adjust-alt",
      component: (
        <ThemeSettings theme={settings.theme} onChangeData={onChangeData} />
      ),
    },
    {
      value: SETTINGS_COLLAPSES.PRIVACY,
      label: "Privacy",
      icon: "bx bxs-lock",
      component: (
        <Privacy privacy={settings.privacy} onChangeSettings={onChangeData} />
      ),
    },
    {
      value: SETTINGS_COLLAPSES.SECURITY,
      label: "Security",
      icon: "bx bxs-check-shield",
      component: (
        <Security
          security={settings.security}
          onChangeSettings={onChangeData}
        />
      ),
    },
    {
      value: SETTINGS_COLLAPSES.HELP,
      label: "Help",
      icon: "bx bxs-help-circle",
      component: <Help />,
    },
  ];

  const onChangeCollapse = (
    id:
      | null
      | SETTINGS_COLLAPSES.PROFILE
      | SETTINGS_COLLAPSES.HELP
      | SETTINGS_COLLAPSES.PRIVACY
      | SETTINGS_COLLAPSES.SECURITY
      | SETTINGS_COLLAPSES.THEME
  ) => {
    setSelectedMenu(id);
  };

  return (
    <div className="position-relative">
      {getSettingsLoading && <Loader />}
      <UserCoverImage basicDetails={settings.basicDetails} />

      <UserProfile
        user = {user}
        basicDetails={settings.basicDetails}
        status={settings.status}
      />
      {/* Start User profile description */}
      <AppSimpleBar className="user-setting">
        <div id="settingprofile" className="accordion accordion-flush">
          {(collapseItems || []).map((item: CollapseItemTypes, key: number) => (
            <AccordianItem
              item={item}
              key={key}
              selectedMenu={selectedMenu}
              onChange={onChangeCollapse}
            />
          ))}
        </div>
        {/* end profile-setting-accordion */}
      </AppSimpleBar>
    </div>
  );
};

export default Index;
