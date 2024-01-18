// MainPage.js
import React from 'react';
import {useNavigate} from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import VolunteerTable from '../components/VolunteerTable';

export default function MainPage(){
  return ( 
    <div>
      <header>
        <h1>HaHa Heroes</h1>
      </header>
      <Tabs>
        <TabList>
          <Tab>About</Tab>
          <Tab>Volunteer Table</Tab>
        </TabList>

        <TabPanel>
          <div>
            <h2>About HaHa Heroes</h2>
            {/* Add about content here */}
          </div>
        </TabPanel>

        <TabPanel>
          <div>
            <VolunteerTable />
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};
