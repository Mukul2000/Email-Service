import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import NavigationBar from "../NavigationBar/NavigationBar";
import './Dashboard.css';

function Dashboard(props) {
    const [name, setName] = useState("");
    const [activeTab, setActiveTab] = useState(0);


    const tables = [['Subscribers', 'subscribers', 'fas fa-home'], ['History', 'history', 'fas fa-history'],
    ['Scheduled', 'scheduled', 'fas fa-calendar-alt'], ['Templates', 'templates', 'fas fa-book-open']];

    useEffect(() => {
        const name = JSON.parse(localStorage.getItem('user')).name;
        setName(name);
    }, [])

    return (
        <div className='outer-wrapper'>
            <NavigationBar />
            <div className='content-wrapper'>
                <div className='tabs-list'>
                    <div className='greeting'>
                        <div className='welcome-text'>Hello {name}</div>
                        <div className='subtitle'> Welcome back! </div>
                    </div>

                    <div id='space-box'></div>
                    {tables.map((item, index) => {
                        return (
                            <div className='table-link' key={index} onClick={() => setActiveTab(index)}>
                                <i className={item[2]}></i>
                                <span className='table-name'>
                                    {item[0]}
                                </span>
                                {/* <Link to={{
                                    pathname: `/user_tables/${item[1]}`,
                                }} > {item[0]}</Link> */}
                            </div>
                        )
                    })}
                </div>
                <div className='tab-data'>
                    {activeTab}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;